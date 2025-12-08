import { useCallback } from "react";

export default function useDirections() {
  const lat = Number(process.env.NEXT_PUBLIC_LAT);
  const lon = Number(process.env.NEXT_PUBLIC_LNG);

  const encodedDestination = `${lat},${lon}`;
  const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;

  const getDirections = useCallback(() => {
    if (!navigator.geolocation) {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodedDestination}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      () => window.open(fallbackUrl, "_blank", "noopener,noreferrer"), // if user denies permission
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, [encodedDestination, fallbackUrl]);

  return { getDirections };
}
