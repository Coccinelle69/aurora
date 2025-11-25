"use client";

import { useTranslation } from "react-i18next";
import { FormInput } from "@/components";

const FormInputs = () => {
  const { t } = useTranslation();
  return (
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
      <FormInput id="phone" name="phone" placeholder={t("phonePlaceholder")}>
        {t("phone")}
      </FormInput>
      <FormInput id="email" name="email" placeholder={t("emailPlaceholder")}>
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
  );
};

export default FormInputs;
