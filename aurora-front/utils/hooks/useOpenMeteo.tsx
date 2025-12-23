"use client";

import { useEffect, useState } from "react";
import { getWeatherInfo } from "../weather-codes";

interface WeatherOpenMeteo {
  is_day: number | null;
  temperature: number | null;
  windspeed: number | null;
  weathercode: number | null;
}

interface Weather {
  isDay: React.ReactNode | null;
  temperature: number | null;
  windspeed: number | null;
  weather: { description: string; icon: React.ReactNode } | null;
  isDayCode: number | null;
}

const useOpenMeteo = () => {
  const [weather, setWeather] = useState<Weather>({
    temperature: null,
    isDay: null,
    windspeed: null,
    weather: null,
    isDayCode: null,
  });
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) {
          const msg = await res.text();
          if (!cancelled)
            setError(`Weather error ${res.status}: ${msg || "no body"}`);
          return;
        }
        const data: WeatherOpenMeteo = await res.json();
        let weatherDescription = null;

        if (data.weathercode !== null && data.is_day !== null) {
          weatherDescription = getWeatherInfo(data.weathercode, data.is_day);
        }

        setWeather({
          temperature: data.temperature,
          isDay: weatherDescription?.isDayIcon,
          windspeed: data.windspeed,
          weather: weatherDescription,
          isDayCode: data.is_day,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Network error");
      }
    }

    loadWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (weather) console.log("weather state:", weather);
  }, [weather]);
  return {
    temperature: weather.temperature,
    isDay: weather.isDay,
    weather: weather.weather,
    windspeed: weather.windspeed,
    isDayCode: weather.isDayCode,
  };
};

export default useOpenMeteo;
