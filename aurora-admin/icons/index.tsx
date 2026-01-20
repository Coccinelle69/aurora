import { Icon } from "@/components";

export const DashboardIcon = (props: { size?: number; color?: string }) => (
  <Icon
    src="/admin/menu/dashboard.png"
    alt="Dashboard"
    {...props}
    size={36}
    color="white"
  />
);
export const BookingsIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/booking.png" alt="Bookings" {...props} size={36} />
);
export const CustomersIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/customer.png" alt="Customers" {...props} size={36} />
);
export const CalendarIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/calendar.png" alt="Calendar" {...props} size={36} />
);

export const PaymentsIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/payment.png" alt="Payments" {...props} size={36} />
);
export const MessagesIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/message.png" alt="Messages" {...props} size={36} />
);
export const TasksIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/tasks.png" alt="Tasks" {...props} size={36} />
);
export const SettingsIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/menu/settings.png" alt="Settings" {...props} size={36} />
);

export const GoogleIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/admin/auth/google.png" alt="Google" {...props} size={20} />
);
