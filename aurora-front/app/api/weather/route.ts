/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Redis from "ioredis";

export const dynamic = "force-dynamic";

const redis =
  (global as any).redis ||
  new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
    connectTimeout: 500,
    maxRetriesPerRequest: 1,
  });
if (process.env.NODE_ENV !== "production") (global as any).redis = redis;

async function refreshWeatherData(cacheKey: string) {
  const lat = (process.env.LAT ?? "0").replace(",", ".");
  const lon = (process.env.LNG ?? "0").replace(",", ".");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (data?.current_weather) {
      const payload = { ...data.current_weather, fetchedAt: Date.now() };
      await redis.set(cacheKey, JSON.stringify(payload), "EX", 7200);
      return payload;
    }
  } catch (e) {
    console.error("Background refresh failed", e);
  }
  return null;
}

export async function GET() {
  const cacheKey = "weather:v2";

  try {
    const cached = await redis.get(cacheKey);

    if (cached) {
      refreshWeatherData(cacheKey);

      return NextResponse.json({
        ...JSON.parse(cached),
        source: "cache",
      });
    }

    // 3. FALLBACK: Only wait if cache is totally empty
    const fresh = await refreshWeatherData(cacheKey);
    return NextResponse.json(fresh || { error: "No data" });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
