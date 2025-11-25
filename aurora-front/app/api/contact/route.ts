import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const serverUrl = `http://aurora-back:8080`;

    const body = await request.text();

    const check = await fetch(`${serverUrl}/contact/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!check.ok) {
      const error = await check.json();
      return NextResponse.json(
        { success: false, errors: error },
        { status: 400 }
      );
    }

    const upstream = await fetch(`${serverUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      return NextResponse.json(
        {
          error: "Upstream error",
          status: upstream.status,
          body: errorText,
        },
        { status: 502 }
      );
    }

    const json = await upstream.json();

    return NextResponse.json(json);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("API /api/contact error:", e);

    return NextResponse.json(
      { error: "Internal error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
