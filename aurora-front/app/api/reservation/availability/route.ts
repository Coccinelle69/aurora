import { NextResponse } from "next/server";

export async function GET() {
  try {
    const serverUrl = `http://aurora-back:8080`;

    const check = await fetch(`${serverUrl}/reservation/all`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await check.json();
    console.log(data);

    if (!data.reservations) {
      return NextResponse.json(
        {
          success: true,
          reservations: [],
          message: "No reservations",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, reservations: data.reservations },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("API /api/contact error:", e);

    return NextResponse.json(
      { error: "Internal error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
