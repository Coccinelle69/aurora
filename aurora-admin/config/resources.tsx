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
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
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
    show: "/bookings/:id",
    create: "/bookings/new",
    edit: "/bookings/edit/:id",
  },
  {
    name: "payments",
    list: "/payments",
    meta: {
      icon: <PaymentsIcon />,
    },
    show: "/payments/:id",
    create: "/payments/new",
    edit: "/payments/edit/:id",
  },
  {
    name: "customers",
    list: "/customers",
    meta: {
      icon: <CustomersIcon />,
    },
    show: "/cutomers/:id",
    create: "/cutomers/new",
    edit: "/cutomers/edit/:id",
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
    show: "/tasks/:id",
    create: "/tasks/new",
    edit: "/tasks/edit/:id",
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
];
