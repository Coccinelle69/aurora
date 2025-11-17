"use client";

import { FormEvent, useState, useEffect } from "react";
import FormInput from "./FormInput";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../UI/LoadingSpinner";

interface Response {
  success: boolean;
}

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [fade, setFade] = useState(false);

  const { t, i18n } = useTranslation();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const jsonBody = JSON.stringify({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      language: i18n.language,
    });

    const response = await fetch("api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonBody,
    });

    const data: Response = await response.json();

    if (data.success) setSuccess(true);

    setSubmitting(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
  }

  useEffect(() => {
    if (sent) {
      // Trigger fade+slide at 4.5s
      const fadeTimer = setTimeout(() => setFade(true), 4500);

      // Fully hide after animation completes (5s total)
      const removeTimer = setTimeout(() => {
        setSent(false);
        setSuccess(null);
        setFade(false);
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [sent, success]);
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

        <div className=" flex justify-end items-center">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center font-body gap-2 uppercase tracking-[.2em] text-marineBlue font-semibold px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition hover:text-babyBlue"
          >
            {submitting ? t("sending") : t("send")}
          </button>
          <LoadingSpinner visible={submitting} />
        </div>

        {sent && (
          <p
            role="status"
            className={`mt-4 text-md font-bold ${
              success ? "text-emerald-700" : "text-[#E53935]"
            } ${fade ? "fade-slide-out" : ""}`}
          >
            {t(success ? "success" : "something-went-wrong")}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
