"use client";

import { FormEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useResponse } from "@/utils/hooks";
import { useDispatch } from "react-redux";
import { resetField } from "@/reducers/contact";
import { FormInputs, LoadingSpinner } from "@/components";

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    fade: false,
    sent: false,
    trigger: false,
  });
  const [body, setBody] = useState<Record<string, unknown> | null>(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { success, done, errorMessage } = useResponse({
    url: "api/contact",
    method: "POST",
    body,
    trigger: formStatus.trigger,
  });

  useEffect(() => {
    if (!done) return;

    queueMicrotask(() => {
      setFormStatus((prev) => {
        return { ...prev, submitting: false, sent: true, trigger: false };
      });
    });

    if (success) {
      dispatch(resetField());
    }
  }, [done]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setBody({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      language: i18n.language,
    });

    setFormStatus((prev) => {
      return { ...prev, submitting: true, trigger: true };
    });

    (e.target as HTMLFormElement).reset();
  }

  useEffect(() => {
    if (formStatus.sent) {
      // Trigger fade+slide at 4.5s
      const fadeTimer = setTimeout(
        () =>
          setFormStatus((prev) => {
            return { ...prev, fade: true };
          }),
        4500
      );

      const removeTimer = setTimeout(() => {
        setFormStatus((prev) => {
          return { ...prev, fade: false, sent: false };
        });
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [formStatus.sent, success]);
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
            disabled={formStatus.submitting}
            className="inline-flex items-center font-body gap-2 uppercase tracking-[.2em] text-marineBlue font-semibold px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition hover:text-babyBlue disabled:cursor-not-allowed"
          >
            {formStatus.submitting ? t("sending") : t("send")}
          </button>
          <LoadingSpinner visible={formStatus.submitting} />
        </div>

        {formStatus.sent && done && (
          <p
            role="status"
            className={`mt-4 text-md font-bold ${
              success ? "text-emerald-700" : "text-[#E53935]"
            } ${formStatus.fade ? "fade-slide-out" : ""}`}
          >
            {success && t("success")}
            {!success && errorMessage === "BLANK" && t("fieldsError")}{" "}
            {!success && errorMessage !== "BLANK" && t("something-went-wrong")}{" "}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
