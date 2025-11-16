"use client";

import { FormEvent, useState } from "react";
import FormInput from "./FormInput";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    await fetch("api/contact");

    // TODO: Hook to your endpoint or 3rd‑party form service.
    // Example POST:
    // await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget) });

    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
  }
  return (
    <section className="p-8 sm:p-12 lg:p-16">
      <h2 className="font-heading text-marineBlue text-4xl sm:text-5xl leading-tight mb-15">
        {t("getInTouch")}
        <br />
        {t("fillTheForm")}
      </h2>

      <form onSubmit={onSubmit} className="max-w-4xl">
        <div className="">
          <FormInput
            id="firstName"
            name="firstName"
            placeholder={t("firstNamePlaceholder")}
          >
            {t("firstName")}
          </FormInput>
          <FormInput
            id="lastName"
            name="lastName"
            placeholder={t("lastNamePlaceholder")}
          >
            {t("lastName")}
          </FormInput>
          <FormInput
            id="phone"
            name="phone"
            placeholder={t("phonePlaceholder")}
          >
            {t("phone")}
          </FormInput>
          <FormInput
            id="email"
            name="email"
            placeholder={t("emailPlaceholder")}
          >
            {t("email")}
          </FormInput>
          <FormInput
            id="message"
            name="message"
            placeholder={t("messagePlaceholder")}
            input={false}
          >
            {t("message")}
          </FormInput>
        </div>

        <div className=" flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center font-body gap-2 uppercase tracking-[.2em] text-marineBlue font-semibold px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition hover:text-babyBlue"
          >
            {submitting ? t("sending") : t("send")}
          </button>
        </div>

        {sent && (
          <p role="status" className="mt-4 text-sm text-emerald-700">
            {t("success")}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
