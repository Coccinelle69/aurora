import { useEffect, useState } from "react";

const useCurrency = () => {
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null | number>(null);
  useEffect(() => {
    let cancelled = false;

    async function loadAmount() {
      try {
        const res = await fetch("/api/currency", { cache: "no-store" });
        if (!res.ok) {
          const msg = await res.text();
          if (!cancelled)
            setError(`Currency error ${res.status}: ${msg || "no body"}`);
          return;
        }
        const data: { amount: number } = await res.json();
        setPrice(data.amount);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Network error");
      }
    }

    loadAmount();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    price,
  };
};

export default useCurrency;
