import { SetStateAction } from "react";
import { ContactState } from "@/reducers/contact";

export interface CheckoutProps {
  setCheckoutUI: React.Dispatch<
    SetStateAction<{
      checkoutCardRemove: boolean;
      checkoutFormRemove: boolean;
      changeUI: boolean;
    }>
  >;
  checkoutUI: {
    checkoutCardRemove: boolean;
    checkoutFormRemove: boolean;
    changeUI: boolean;
  };
  internalNavigationRef?: React.RefObject<boolean>;
}

export interface MapProps {
  zoom?: number;
  title?: string;
  className?: string;
  detailsMap?: boolean;
}

export interface IconProps {
  src: string;
  alt: string;
  size?: number;
  color?: string;
  className?: string;
}

export interface FormInputProps {
  id: string;
  name: keyof ContactState;
  placeholder: string;
  children: React.ReactNode;
  input?: boolean;
  checkout?: boolean;
}

export interface searchUI {
  available: boolean;
  searchDone: boolean;
  error: boolean;
  notificationDisappeared: boolean;
  stayDurationError: boolean;
  outOfSeason: boolean;
  price: null | string | number;
  sign: string;
}

export interface searchUIProps {
  setSearchUI: React.Dispatch<SetStateAction<searchUI>>;
  searchUI: searchUI;
}

declare global {
  interface Window {
    __gmapsReady?: boolean;
  }
}
