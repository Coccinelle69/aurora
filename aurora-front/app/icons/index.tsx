import { Icon } from "../components/UI/Icon";

const MenuIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/header/burger-bar.png" alt="Menu" {...props} />
);

const CloseIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/header/close.png" alt="Close" {...props} />
);

const FacebookIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/header/facebook.png" alt="Facebook" {...props} />
);

const InstagramIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/header/instagram.png" alt="Instagram" {...props} />
);

const BarbecueIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/facilities/barbecue.png" alt="Barbecue" {...props} />
);

const BlanketIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/facilities/blanket.png" alt="Linens" {...props} />
);

const FamilyIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/facilities/family.png" alt="Family" {...props} />
);

const FreeParkingIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/facilities/free-parking.png" alt="Free Parking" {...props} />
);

const OceanIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/facilities/ocean.png" alt="Sea View" {...props} />
);

const WifiIcon = (props: { size?: number; color?: string }) => (
  <Icon src="/facilities/wifi.png" alt="WiFi" {...props} />
);

export {
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  CloseIcon,
  BarbecueIcon,
  BlanketIcon,
  FamilyIcon,
  FreeParkingIcon,
  OceanIcon,
  WifiIcon,
};
