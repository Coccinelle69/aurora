"use client";
import { useSearchParams } from "next/navigation";

export default function ReservationResultPage() {
  const params = useSearchParams();
  const status = params.get("status");

  const content = {
    confirmed: {
      title: "Reservation confirmed",
      text: "The reservation has been successfully confirmed.",
      color: "text-emerald-700",
    },
    cancelled: {
      title: "Reservation cancelled",
      text: "The reservation has been cancelled.",
      color: "text-red-600",
    },
    expired: {
      title: "Link expired",
      text: "This confirmation link is no longer valid.",
      color: "text-orange-100",
    },
    used: {
      title: "Link already used",
      text: "This action has already been performed.",
      color: "text-marineBlue",
    },
    error: {
      title: "Error",
      text: "An unexpected error occurred.",
      color: "text-red-700",
    },
  } as const;

  const current = content[status as keyof typeof content] ?? content.error;

  return (
    <main className="text-center bg-marineBlue/55 p-20 rounded-4xl">
      <h1
        className="font-logo font-bold text-8xl mb-10 tracking-widest
"
      >
        Aurora
      </h1>
      <h2 className={`text-4xl font-heading mb-4 ${current.color}`}>
        {current.title}
      </h2>
      <p className="text-white font-body">{current.text}</p>
    </main>
  );
}
