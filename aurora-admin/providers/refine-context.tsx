"use client";

import { Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "./data";
import { authProvider } from "./auth";
import routerProvider from "@refinedev/nextjs-router";
import {
  BookingsIcon,
  CalendarIcon,
  CustomersIcon,
  DashboardIcon,
  MessagesIcon,
  PaymentsIcon,
  SettingsIcon,
  TasksIcon,
} from "@/icons";

const RefineContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <Refine
      dataProvider={dataProvider}
      liveProvider={liveProvider}
      authProvider={authProvider}
      routerProvider={routerProvider}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        liveMode: "auto",
      }}
      resources={[
        {
          name: "dashboard",
          list: "/dashboard",
          meta: {
            icon: <DashboardIcon />,
            label: "Dashboard",
          },
        },
        {
          name: "bookings",
          list: "/bookings",
          meta: {
            icon: <BookingsIcon />,
          },
        },
        {
          name: "payments",
          list: "/payments",
          meta: {
            icon: <PaymentsIcon />,
          },
        },
        {
          name: "customers",
          list: "/customers",
          meta: {
            icon: <CustomersIcon />,
          },
        },
        {
          name: "calendar",
          list: "/calendar",
          meta: {
            icon: <CalendarIcon />,
            label: "Calendar",
          },
        },
        {
          name: "tasks",
          list: "/tasks",
          meta: {
            icon: <TasksIcon />,
          },
        },
        {
          name: "messages",
          list: "/messages",
          meta: {
            icon: <MessagesIcon />,
          },
        },
        {
          name: "settings",
          list: "/settings",
          meta: {
            icon: <SettingsIcon />,
          },
        },
      ]}
    >
      {children}
    </Refine>
  );
};

export default RefineContext;
