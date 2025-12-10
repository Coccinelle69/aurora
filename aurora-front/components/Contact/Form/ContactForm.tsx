"use client";

import { FormEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useResponse } from "@/utils/hooks";
import { useDispatch } from "react-redux";
import { resetField } from "@/reducers/contact";
import { FormInputs, LoadingSpinner } from "@/components";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [fade, setFade] = useState(false);
  const [body, setBody] = useState<Record<string, unknown> | null>(null);
  const [trigger, setTrigger] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { data, success, done, errorMessage } = useResponse({
    url: "api/contact",
    method: "POST",
    body,
    trigger,
  });

  useEffect(() => {
    if (!done) return;

    queueMicrotask(() => {
      setSubmitting(false);
      setSent(true);
      setTrigger(false);
    });

    if (success) {
      dispatch(resetField());
    }
  }, [done]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    // setError(null);
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    setBody({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message") ?? "",
      language: i18n.language,
    });

    setTrigger(true);
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
        <FormInputs />

        <div className=" flex justify-end items-center">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center font-body gap-2 uppercase tracking-[.2em] text-marineBlue font-semibold px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition hover:text-babyBlue disabled:cursor-not-allowed"
          >
            {submitting ? t("sending") : t("send")}
          </button>
          <LoadingSpinner visible={submitting} />
        </div>

        {sent && done && (
          <p
            role="status"
            className={`mt-4 text-md font-bold ${
              success ? "text-emerald-700" : "text-[#E53935]"
            } ${fade ? "fade-slide-out" : ""}`}
          >
            {success && t("success")}
            {!success && errorMessage && t(errorMessage)}
            {/* {!success && error && t(error)} */}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
