import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface useCurrencyProps {
  from: string;
  to: string;
}

interface ConvertedPriceData {
  totalNights: number;
  price: number;
  total: number;
  fromPrice: number;
  fromTotalPrice: number;
  toPrice: number;
  toTotalPrice: number;
  rate?: number;
  fromDates?: Date[];
  toDates?: Date[];
  fromNights?: number;
  toNights?: number;
  error?: string;
}

const useCurrency = ({ from, to }: useCurrencyProps) => {
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<ConvertedPriceData>();
  const { value: currency, sign } = useAppSelector((state) => state.currency);

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
        const data = await res.json();
        console.log("USE CURRENCY" + data);

        setPriceData(data);

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
  }, [currency, from, to]);

  return {
    priceData,
    sign,
  };
};

export default useCurrency;
