import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const url = `http://aurora-back:8080/contact`;

    const body = await request.text(); //gives json string already

    const upstream = await fetch(url, {
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
          url,
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
