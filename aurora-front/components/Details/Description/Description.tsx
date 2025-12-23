"use client";
import { memo } from "react";

import { useTranslation } from "react-i18next";
import { HouseRules, PropertyAmenities, PropertyFeatures } from "@/components";

const Description = () => {
  const { t } = useTranslation();
  const amenities = Object.values(
    t("apartmentZukve.amenities", { returnObjects: true })
  );
  const neighbourhood = Object.values(
    t("apartmentZukve.neighborhood.nearby", { returnObjects: true })
  );

  const otherPoints = Object.values(
    t("apartmentZukve.other.points", { returnObjects: true })
  );

  const options = Object.values(
    t("apartmentZukve.gettingAround.options", { returnObjects: true })
  );

  return (
    <div className="w-full md:w-[70%] text-default order-2 lg:order-1">
      <h2 className="font-bold font-heading text-[2rem]">
        {t("apartmentZukve.title")}
      </h2>
      <section className="mt-12">
        <h3 className="details-title">{t("apartmentZukve.description")}</h3>
        <p>{t("apartmentZukve.intro")}</p>
      </section>
      <section className="details-margin">
        <h3 className="details-title">{t("apartmentZukve.amenitiesTitle")}</h3>
        {amenities.map((a, i) => (
          <div key={i}>
            <span>• </span>
            <span> {a}</span>
          </div>
        ))}
      </section>
      <section className="details-margin">
        <h3 className="details-title">{t("apartmentZukve.spaceTitle")}</h3>
        <p>{t("apartmentZukve.spaceDescription")}</p>
      </section>
      <section className="details-margin">
        <h3 className="details-title">
          {t("apartmentZukve.neighborhood.title")}
        </h3>
        <p>{t("apartmentZukve.neighborhood.description")}</p>
        {neighbourhood.map((n, i) => (
          <div key={i}>
            <span>• </span>
            <span> {n}</span>
          </div>
        ))}
      </section>
      <section className="details-margin">
        <h3 className="details-title">
          {t("apartmentZukve.interaction.title")}
        </h3>
        <p>
          {t("apartmentZukve.interaction.description")}
          <br></br>
          <br></br>
        </p>
        <p>
          {t("apartmentZukve.interaction.pickup")}
          <br></br>
          <br></br>
        </p>
        <p>{t("apartmentZukve.interaction.note")}</p>
      </section>

      <section className="details-margin">
        <h3 className="details-title">
          {t("apartmentZukve.gettingAround.title")}
        </h3>
        {options.map((o, i) => (
          <div key={i}>
            <span>- </span>
            <span> {o}</span>
          </div>
        ))}
        <p>{t("apartmentZukve.gettingAround.parking")}</p>
      </section>

      <section className="details-margin">
        <h3 className="details-title">
          {t("apartmentZukve.checkInOut.title")}
        </h3>
        <p>{t("apartmentZukve.checkInOut.checkIn")}</p>
        <p>{t("apartmentZukve.checkInOut.checkOut")}</p>
      </section>

      <section className="details-margin">
        <h3 className="details-title">{t("apartmentZukve.other.title")}</h3>
        {otherPoints.map((op, i) => (
          <div key={i}>
            <span>** </span>
            <span> {op}</span>
          </div>
        ))}
      </section>
      <section className="details-margin">
        <PropertyFeatures />
      </section>
      <section className="details-margin">
        <PropertyAmenities />
      </section>
      <section className="details-margin">
        <HouseRules />
      </section>
    </div>
  );
};

export default memo(Description);
