import { Icon } from "../components/Icon";

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

export { FacebookIcon, InstagramIcon, MenuIcon, CloseIcon };
