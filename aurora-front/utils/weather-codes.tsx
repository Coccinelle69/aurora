import {
  SunIcon,
  MoonIcon,
  CloudyIcon,
  PartlyCloudyDayIcon,
  PartlyCloudyNightIcon,
  HailIcon,
  SnowflakeIcon,
  RainIcon,
  ThunderstormIcon,
  FogIcon,
  FreezingRainIcon,
} from "@/icons";

export enum WeatherCode {
  Clear = 0,
  MainlyClear = 1,
  PartlyCloudy = 2,
  Overcast = 3,
  Fog = 45,
  DepositingRimeFog = 48,
  LightDrizzle = 51,
  ModerateDrizzle = 53,
  DenseDrizzle = 55,
  LightFreezingDrizzle = 56,
  DenseFreezingDrizzle = 57,
  SlightRain = 61,
  ModerateRain = 63,
  HeavyRain = 65,
  LightFreezingRain = 66,
  HeavyFreezingRain = 67,
  SlightSnowfall = 71,
  ModerateSnowfall = 73,
  HeavySnowfall = 75,
  SnowGrains = 77,
  SlightRainShowers = 80,
  ModerateRainShowers = 81,
  ViolentRainShowers = 82,
  SlightSnowShowers = 85,
  HeavySnowShowers = 86,
  Thunderstorm = 95,
  ThunderstormWithLightHail = 96,
  ThunderstormWithHeavyHail = 99,
}

export function getWeatherInfo(
  code: WeatherCode,
  isDay: number
): {
  description: string;
  icon: React.ReactNode;
  isDayIcon: React.ReactNode;
} {
  // JSON translation keys
  const translationKeys: Record<WeatherCode, string> = {
    [WeatherCode.Clear]: "weather-clear",
    [WeatherCode.MainlyClear]: "weather-mainlyClear",
    [WeatherCode.PartlyCloudy]: "weather-partlyCloudy",
    [WeatherCode.Overcast]: "weather-overcast",
    [WeatherCode.Fog]: "weather-fog",
    [WeatherCode.DepositingRimeFog]: "weather-rimeFog",
    [WeatherCode.LightDrizzle]: "weather-lightDrizzle",
    [WeatherCode.ModerateDrizzle]: "weather-moderateDrizzle",
    [WeatherCode.DenseDrizzle]: "weather-denseDrizzle",
    [WeatherCode.LightFreezingDrizzle]: "weather-lightFreezingDrizzle",
    [WeatherCode.DenseFreezingDrizzle]: "weather-denseFreezingDrizzle",
    [WeatherCode.SlightRain]: "weather-lightRain",
    [WeatherCode.ModerateRain]: "weather-moderateRain",
    [WeatherCode.HeavyRain]: "weather-heavyRain",
    [WeatherCode.LightFreezingRain]: "weather-lightFreezingRain",
    [WeatherCode.HeavyFreezingRain]: "weather-heavyFreezingRain",
    [WeatherCode.SlightSnowfall]: "weather-lightSnowfall",
    [WeatherCode.ModerateSnowfall]: "weather-moderateSnowfall",
    [WeatherCode.HeavySnowfall]: "weather-heavySnowfall",
    [WeatherCode.SnowGrains]: "weather-snowGrains",
    [WeatherCode.SlightRainShowers]: "weather-slightRainShowers",
    [WeatherCode.ModerateRainShowers]: "weather-moderateRainShowers",
    [WeatherCode.ViolentRainShowers]: "weather-violentRainShowers",
    [WeatherCode.SlightSnowShowers]: "weather-slightSnowShowers",
    [WeatherCode.HeavySnowShowers]: "weather-heavySnowShowers",
    [WeatherCode.Thunderstorm]: "weather-thunderstorm",
    [WeatherCode.ThunderstormWithLightHail]: "weather-thunderstormLightHail",
    [WeatherCode.ThunderstormWithHeavyHail]: "weather-thunderstormHeavyHail",
  };

  // 🌞 day/night icon (small icon)
  const isDayIcon = isDay ? <SunIcon /> : <MoonIcon />;

  // 🌧 main weather icon
  let icon: React.ReactNode = null;

  if (code === WeatherCode.Clear) icon = isDay ? <SunIcon /> : <MoonIcon />;
  else if ([WeatherCode.MainlyClear, WeatherCode.PartlyCloudy].includes(code))
    icon = isDay ? <PartlyCloudyDayIcon /> : <PartlyCloudyNightIcon />;
  else if (code === WeatherCode.Overcast) icon = <CloudyIcon />;
  else if ([WeatherCode.Fog, WeatherCode.DepositingRimeFog].includes(code))
    icon = <FogIcon />;
  else if (
    [
      WeatherCode.LightDrizzle,
      WeatherCode.ModerateDrizzle,
      WeatherCode.DenseDrizzle,
      WeatherCode.SlightRain,
      WeatherCode.ModerateRain,
      WeatherCode.HeavyRain,
      WeatherCode.SlightRainShowers,
      WeatherCode.ModerateRainShowers,
      WeatherCode.ViolentRainShowers,
    ].includes(code)
  ) {
    icon = <RainIcon />;
  } else if (
    [WeatherCode.LightFreezingRain, WeatherCode.HeavyFreezingRain].includes(
      code
    )
  ) {
    icon = <FreezingRainIcon />;
  } else if (
    [
      WeatherCode.SlightSnowfall,
      WeatherCode.ModerateSnowfall,
      WeatherCode.HeavySnowfall,
      WeatherCode.SlightSnowShowers,
      WeatherCode.HeavySnowShowers,
      WeatherCode.SnowGrains,
    ].includes(code)
  ) {
    icon = <SnowflakeIcon />;
  } else if (code === WeatherCode.Thunderstorm) icon = <ThunderstormIcon />;
  else if (
    [
      WeatherCode.ThunderstormWithLightHail,
      WeatherCode.ThunderstormWithHeavyHail,
    ].includes(code)
  ) {
    icon = <HailIcon />;
  }

  return {
    description: translationKeys[code],
    icon,
    isDayIcon,
  };
}
