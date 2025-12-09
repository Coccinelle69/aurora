"use client";

import { FormEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useResponse } from "@/utils/hooks";
import { useDispatch } from "react-redux";
import { resetField } from "@/reducers/contact";
import { FormInputs, LoadingSpinner } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { CheckoutProps } from "@/utils/interfaces";

const CheckoutForm = ({ setCheckoutUI, checkoutUI }: CheckoutProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [fade, setFade] = useState(false);
  const [body, setBody] = useState<Record<string, unknown> | null>(null);
  const [trigger, setTrigger] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { data, success, done, errorMessage } = useResponse({
    url: "api/reservation/request",
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
      message: formData.get("message"),
      language: i18n.language,
    });

    setTrigger(true);
    setSent(true);

    (e.target as HTMLFormElement).reset();
  }

  useEffect(() => {
    if (sent) {
      const fadeTimer = setTimeout(() => setFade(true), 4500);

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

  const goToCheckoutCard = () => {
    window.history.pushState({}, "", "/book/details");

    setCheckoutUI((prev) => {
      return { ...prev, changeUI: true };
    });
  };

  useEffect(() => {
    if (checkoutUI.changeUI) {
      const hideCheckoutFormTimer = setTimeout(() => {
        setCheckoutUI((prevUI) => {
          return {
            ...prevUI,
            checkoutFormRemove: true,
            checkoutCardRemove: false,
            changeUI: false,
          };
        });
      }, 1500);

      return () => {
        clearTimeout(hideCheckoutFormTimer);
      };
    }
  }, [checkoutUI.changeUI]);

  return (
    <AnimatePresence mode="wait">
      {!checkoutUI.checkoutFormRemove && (
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={
            checkoutUI.changeUI && !checkoutUI.checkoutFormRemove
              ? { x: 0, opacity: 0 }
              : { x: -40, opacity: 1 }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="shadow-lg max-w-[560px] sm:w-full sm:p-10 sm:sticky sm:top-[25px] order-1 sm:order-2 rounded-3xl bg-white"
        >
          <h2 className="font-heading text-marineBlue text-4xl sm:text-5xl leading-tight mb-10">
            {t("fillDetails")}
          </h2>
          <h3 className="text-marineBlue sm:text-xl mb-3">
            {t("guestInformation")}
          </h3>
          <form onSubmit={onSubmit} className="max-w-4xl">
            <FormInputs checkout={true} />

            <div className=" flex justify-end items-center">
              <button
                onClick={goToCheckoutCard}
                type="button"
                className="inline-flex items-center font-body gap-2   text-marineBlue font-bold px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition"
              >
                &#8592;
              </button>
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
              </p>
            )}
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutForm;
