import { NextResponse } from "next/server";
import { priceList } from "@/utils/priceList";

export const dynamic = "force-dynamic";

interface PriceResult {
  totalNights: number;
  price: number | null;
  total: number;
  error?: string;
  fromPrice?: number;
  fromTotalPrice?: number;
  toPrice?: number;
  toTotalPrice?: number;
}

export async function GET(request: Request) {
  try {
    const baseCurrency = "EUR";

    const { searchParams } = new URL(request.url);

    const selectedCurrency = searchParams.get("currency");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const fromDate = new Date(from ?? "");
    const toDate = new Date(to ?? "");
    let amount: PriceResult = {
      totalNights: 0,
      price: 0,
      total: 0,
    };

    amount = priceList(fromDate, toDate);
    console.log(amount);

    const pricesEUR = {
      ...amount,
      fromPrice: amount.fromPrice,
      fromTotalPrice: amount.fromTotalPrice!,
      toPrice: amount.toPrice,
      toTotalPrice: amount.toTotalPrice!,
      price: amount.price,
      total: amount.total,
    };

    if (selectedCurrency === "EUR") return NextResponse.json(pricesEUR);

    const url = `https://api.frankfurter.app/latest?amount=1&from=${baseCurrency}&to=${selectedCurrency}`;

    const upstream = await fetch(url, { cache: "no-store" });

    if (!upstream.ok) {
      const body = await upstream.text();
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body, url },
        { status: 502 }
      );
    }

    const json = await upstream.json();
    const rate = json.rates[selectedCurrency!];
    const converted = {
      ...amount,
      fromPrice: amount.fromPrice! * +rate,
      fromTotalPrice: amount.fromTotalPrice! * +rate,
      toPrice: amount.toPrice! * +rate,
      toTotalPrice: amount.toTotalPrice! * +rate,
      price: amount.price! * +rate,
      total: amount.total! * +rate,
      rate,
      priceEUR: amount.fromPrice,
      totalPriceEUR: amount.total,
    };

    if (!json) {
      return NextResponse.json(
        { error: "No currency in response", raw: json, url },
        { status: 500 }
      );
    }

    console.log(json.rates[selectedCurrency!]);

    return NextResponse.json(converted);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("SERVER ERROR:", e);
    return NextResponse.json(
      { error: "Internal error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
