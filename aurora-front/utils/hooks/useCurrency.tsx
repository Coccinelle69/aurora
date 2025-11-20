import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface useCurrencyProps {
  currency: string;
  from: string;
  to: string;
}

const useCurrency = ({ from, to }: useCurrencyProps) => {
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null | number>(null);
  const currency = useAppSelector((state) => state.currency.value);

  useEffect(() => {
    let cancelled = false;

    async function loadAmount() {
      try {
        const res = await fetch(
          `/api/convert?currency=${currency}&from=${from}&to=${to}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          const msg = await res.text();
          if (!cancelled)
            setError(`Currency error ${res.status}: ${msg || "no body"}`);
          return;
        }
        const data: {
          priceBaseCurrency: number;
          priceSelectedCurrency: number;
        } = await res.json();
        if (currency === "EUR") setPrice(data.priceBaseCurrency);
        setPrice(data.priceSelectedCurrency);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);

        if (!cancelled) setError(e?.message ?? "Network error");
      }
    }

    loadAmount();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  return {
    price,
  };
};

export default useCurrency;
