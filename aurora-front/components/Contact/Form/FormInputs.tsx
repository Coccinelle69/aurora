"use client";

import { useTranslation } from "react-i18next";
import { FormInput } from "@/components";

const FormInputs = ({ checkout }: { checkout?: boolean }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={`${checkout ? "flex flex-row" : ""} `}>
        <FormInput
          id="firstName"
          name="firstName"
          placeholder={t("firstNamePlaceholder")}
          checkout={checkout}
        >
          {t("firstName")}
        </FormInput>
        <FormInput
          id="lastName"
          name="lastName"
          placeholder={t("lastNamePlaceholder")}
          checkout={checkout}
        >
          {t("lastName")}
        </FormInput>
      </div>
      <div className={`${checkout ? "flex flex-row" : ""} `}>
        <FormInput
          id="phone"
          name="phone"
          placeholder={t("phonePlaceholder")}
          checkout={checkout}
        >
          {t("phone")}
        </FormInput>
        <FormInput
          id="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          checkout={checkout}
        >
          {t("email")}
        </FormInput>
      </div>
      <FormInput
        id="message"
        name="message"
        placeholder={
          checkout ? t("specialRequestTitle") : t("messagePlaceholder")
        }
        input={false}
        checkout={checkout}
      >
        {checkout ? t("specialRequestPlaceholder") : t("message")}
      </FormInput>
    </div>
  );
};

export default FormInputs;
