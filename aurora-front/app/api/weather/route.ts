import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const latStr = (
      process.env.LAT ??
      process.env.NEXT_PUBLIC_LAT ??
      ""
    ).trim();
    const lonStr = (
      process.env.LON ??
      process.env.NEXT_PUBLIC_LON ??
      ""
    ).trim();

    // Replace comma decimal separators, remove spaces
    const lat = Number(latStr.replace(",", "."));
    const lon = Number(lonStr.replace(",", "."));

    if (!latStr || !lonStr) {
      return NextResponse.json(
        { error: "Missing LAT/LON env vars", got: { latStr, lonStr } },
        { status: 400 }
      );
    }
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return NextResponse.json(
        { error: "Invalid LAT/LON (NaN)", got: { latStr, lonStr, lat, lon } },
        { status: 400 }
      );
    }

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const upstream = await fetch(url, { cache: "no-store" });

    if (!upstream.ok) {
      const body = await upstream.text();
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body, url },
        { status: 502 }
      );
    }

    const json = await upstream.json();
    if (!json?.current_weather) {
      return NextResponse.json(
        { error: "No current_weather in response", raw: json, url },
        { status: 500 }
      );
    }

    return NextResponse.json(json.current_weather);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json(
      { error: "Internal error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
