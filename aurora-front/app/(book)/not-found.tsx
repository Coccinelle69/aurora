"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-6">
      <div className="absolute inset-0 -z-10">
        {" "}
        <Image
          src="/404.webp"
          alt="Not Found"
          fill
          priority
          quality={60}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <main className="relative z-10 text-center bg-marineBlue/55 p-12 xl:p-16 2xl:p-20  rounded-4xl">
        <h1
          className="font-logo font-bold text-5xl xl:text-6xl 2xl:text-8xl mb-6 xl:mb-10 tracking-widest
"
        >
          Aurora
        </h1>
        <h2 className={`text-4xl font-heading mb-4 text-`}>{t("notFound")}</h2>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center font-body gap-2   text-white font-bold px-2 sm:px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-babyBlue transition"
        >
          &#8592;
          <p className="font-body text-white">{t("back")}</p>
        </button>
      </main>
    </div>
  );
}
