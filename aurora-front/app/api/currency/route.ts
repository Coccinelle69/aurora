import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const baseCurrency = "EUR";
    const currencies = "USD,GBP,PLN,RUB,HUF,CZK,CNY";

    const { searchParams } = new URL(request.url);

    let amount = null;

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const fromDate = new Date(from ?? "");
    const toDate = new Date(to ?? "");

    switch (true) {
      case new Date(fromDate) >= new Date("2025-05-15") &&
        new Date(toDate) <= new Date("2025-05-31"):
        amount = 90;
        break;

      case new Date(fromDate) >= new Date("2025-06-01") &&
        new Date(toDate) <= new Date("2025-06-30"):
        amount = 105;
        break;

      case new Date(fromDate) >= new Date("2025-07-01") &&
        new Date(toDate) <= new Date("2025-08-31"):
        amount = 120;
        break;

      default:
        amount = null;
    }

    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${currencies}`;

    const upstream = await fetch(url, { cache: "no-store" });

    if (!upstream.ok) {
      const body = await upstream.text();
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body, url },
        { status: 502 }
      );
    }

    const json = await upstream.json();
    if (!json) {
      return NextResponse.json(
        { error: "No currency in response", raw: json, url },
        { status: 500 }
      );
    }

    console.log(json.amount);

    return NextResponse.json(json);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json(
      { error: "Internal error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
