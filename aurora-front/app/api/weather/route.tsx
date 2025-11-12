import { NextResponse } from "next/server";

export async function GET() {
  const lat = process.env.NEXT_PUBLIC_LAT;
  const lon = process.env.NEXT_PUBLIC_LON;

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&${lon}=15.211&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data.current_weather);
}
