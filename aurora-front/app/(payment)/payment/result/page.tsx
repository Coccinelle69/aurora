"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PaymentResultPage() {
  const params = useSearchParams();
  const status = params.get("status");
  const { t } = useTranslation();

  const isSuccess = status === "success";
  const isCancelled = status === "cancelled";
  const isPaid = status === "paid";

  return (
    <main className=" bg-marineBlue/55 flex flex-col items-center justify-center text-center p-6 sm:p-20 rounded-4xl">
      <h1
        className="font-logo font-bold text-6xl sm:text-8xl mb-10 tracking-widest
"
      >
        Aurora
      </h1>
      <div className="max-w-md">
        {isSuccess && (
          <>
            <h2 className="text-3xl font-bold text-emerald-600 mb-4">
              {t("payment.successTitle")}
            </h2>
            <p className="text-white mb-6">{t("payment.successMessage")}</p>
          </>
        )}

        {isCancelled && (
          <>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              {t("payment.cancelledTitle")}
            </h2>
            <p className="text-slate-600 mb-6">
              {t("payment.cancelledMessage")}
            </p>
          </>
        )}

        {isPaid && (
          <>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              {t("payment.alreadyPaidTitle")}
            </h2>
            <p className="text-slate-600 mb-6">
              {t("payment.alreadyPaidMessage")}
            </p>
          </>
        )}

        {!isSuccess && !isCancelled && !isPaid && (
          <>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              {t("payment.errorTitle")}
            </h2>
            <p className="text-slate-600 mb-6"> {t("payment.errorMessage")}</p>
          </>
        )}

        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 rounded-lg bg-marineBlue text-white"
        >
          {t("payment.backHome")}
        </Link>
      </div>
    </main>
  );
}
