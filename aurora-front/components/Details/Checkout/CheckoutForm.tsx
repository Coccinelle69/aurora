"use client";

import { FormEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDevice, useResponse } from "@/utils/hooks";
import { useDispatch } from "react-redux";
import { resetField } from "@/reducers/contact";
import { FormInputs, LoadingSpinner } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { CheckoutProps } from "@/utils/interfaces";
import { useAppSelector } from "@/store/hooks";

const CheckoutForm = ({ setCheckoutUI, checkoutUI }: CheckoutProps) => {
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    fade: false,
    sent: false,
    trigger: false,
  });
  const [body, setBody] = useState<Record<string, unknown> | null>(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    adults,
    teens,
    children,
    arrival: arrivalDate,
    departure: departureDate,
  } = useAppSelector((state) => state.search);
  const { sm, lg, md } = useDevice();
  const initialX = !sm ? 40 : !md ? 60 : !lg ? 80 : 40;
  const xOffset = !sm ? 0 : !md ? 0 : !lg ? 0 : -20;

  const { success, done, errorMessage, data } = useResponse({
    url: "/api/reservation/request",
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
      adults,
      teens,
      children,
      arrivalDate,
      departureDate,
      language: i18n.language,
      source: "CHECKOUT",
    });

    setFormStatus((prev) => {
      return { ...prev, submitting: true, trigger: true };
    });

    (e.target as HTMLFormElement).reset();
  }

  useEffect(() => {
    if (formStatus.sent) {
      const fadeTimer = setTimeout(
        () =>
          setFormStatus((prev) => {
            return { ...prev, fade: true };
          }),
        4500
      );

      const removeTimer = setTimeout(() => {
        setFormStatus((prev) => {
          return { ...prev, sent: false, fade: false };
        });
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [formStatus.sent, success]);

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
          initial={{ x: initialX, opacity: 0 }}
          animate={
            checkoutUI.changeUI && !checkoutUI.checkoutFormRemove
              ? { x: initialX, opacity: 0 }
              : { x: xOffset, opacity: 1 }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="shadow-lg mx-auto w-full md:max-w-[560px] p-5 sm:p-10 lg:sticky lg:top-[25px]  order-1 lg:order-2 rounded-3xl bg-white"
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
                className="inline-flex items-center font-body gap-2   text-marineBlue font-bold px-2 sm:px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition"
              >
                &#8592;
              </button>
              <button
                type="submit"
                disabled={formStatus.submitting}
                className="inline-flex items-center text-[0.8rem] sm:text-[1rem] font-body gap-2 uppercase tracking-[.2em] text-marineBlue font-semibold px-2 sm:px-5 mt-4 py-3 rounded-xl bg-transparent hover:bg-slate-200 transition hover:text-babyBlue active:bg-slate-200 active:text-babyBlue disabled:cursor-not-allowed"
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
                {errorMessage &&
                  errorMessage === "BLANK" &&
                  t("fieldsError")}{" "}
                {data.existingReservation && t("alreadyRequested")}
                {errorMessage &&
                  errorMessage !== "BLANK" &&
                  t("something-went-wrong")}{" "}
              </p>
            )}
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutForm;
