import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { AppImage } from "../components/Image";

const CloseIcon = (props: { size?: number; color?: string }) => (
  <AppImage src="/close.png" alt="Close" {...props} />
);

// const FreeParkingIcon = ({ size = 48 }: { size?: number }) => (
//   <Image
//     src="/free-parking.png"
//     alt="Free Parking"
//     width={size}
//     height={size}
//     style={{
//       filter:
//         color === "white"
//           ? "invert(1) brightness(100%)"
//           : "invert(0) brightness(1)",
//     }}
//   />
// );

const FreeWifiIcon = ({ size = 48 }: { size?: number }) => (
  <Image src="/wifi.png" alt="Wifi icon" width={size} height={size} />
);

// const FreeParkingIcon = ({ size = 48 }: { size?: number }) => (
//   <Image
//     src="/free-parking.png"
//     alt="Free Parking"
//     width={size}
//     height={size}
//   />
// );

// const FreeParkingIcon = ({ size = 48 }: { size?: number }) => (
//   <Image
//     src="/free-parking.png"
//     alt="Free Parking"
//     width={size}
//     height={size}
//   />
// );
export { FacebookIcon, InstagramIcon, MenuIcon, CloseIcon, FreeWifiIcon };
