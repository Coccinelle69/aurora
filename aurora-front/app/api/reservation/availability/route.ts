import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const serverUrl = `http://aurora-back:8080`;

    const { searchParams } = new URL(request.url);

    const arrival = searchParams.get("arrival");
    const departure = searchParams.get("departure");

    const check = await fetch(
      `${serverUrl}/reservation/availability?arrival=${arrival}&departure=${departure}`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    const data = await check.json();
    console.log(data);

    if (!data.available) {
      return NextResponse.json(
        {
          success: false,
          available: data.available,
          message: "No available dates",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Available dates", available: data.available },
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
