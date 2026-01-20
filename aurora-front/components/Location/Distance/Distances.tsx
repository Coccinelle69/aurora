"use client";

import { useTranslation } from "react-i18next";
import { Distance } from "@/components";
import {
  BeachIcon,
  BusIcon,
  AirportIcon,
  SeaIcon,
  FocusIcon,
  GroceriesIcon,
  RestaurantIcon,
  DoctorIcon,
  GasStationIcon,
  PharmacyIcon,
  BankIcon,
} from "@/icons";

export default function Distances() {
  const { t } = useTranslation();
  const items = [
    {
      icon: <SeaIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.sea")}`,
      value: "70 m",
    },
    {
      icon: <BeachIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.beach")}`,
      value: "70 m",
    },
    {
      icon: <FocusIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.downtown")}`,
      value: "2 km",
    },
    {
      icon: <GroceriesIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.groceries")}`,
      value: "2 km",
    },
    {
      icon: <RestaurantIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.restaurant")}`,
      value: "200 m",
    },
    {
      icon: <DoctorIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.doctor")}`,
      value: "1 km",
    },
    {
      icon: <PharmacyIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.pharmacy")}`,
      value: "1 km",
    },
    {
      icon: <BankIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.bank")}`,
      value: "2 km",
    },
    {
      icon: <GasStationIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.gasStation")}`,
      value: "2 km",
    },
    {
      icon: <BusIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.busStation")}`,
      value: "20 km",
    },
    {
      icon: <AirportIcon size={32} color="#4a6ca3" />,
      label: `${t("distances.airport")}`,
      value: "30 km",
    },
  ];

  return <Distance items={items} />;
}
