"use client";
import {
  MailIcon,
  MessengerIcon,
  PaperclipIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/icons";
import { useTranslation } from "react-i18next";

export default function ShareButton() {
  const { t } = useTranslation();
  const shareUrl = encodeURIComponent(window.location.href);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(t("shareText"));
    const whatsapp = `https://wa.me/?text=${text}%20${shareUrl}`;
    window.open(whatsapp, "_blank", "noopener,noreferrer");
  };

  const handleMessenger = () => {
    const messenger = `https://www.facebook.com/dialog/send?link=${shareUrl}`;
    window.open(messenger, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied");
  };

  const handleMail = () => {
    const subject = encodeURIComponent("Aurora Apartment – Zukve, Croatia");
    const body = encodeURIComponent(
      `${t("shareText")}:\n\n${window.location.href}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const items = [
    {
      label: <MessengerIcon className="rotate-45" size={20} />,
      x: -60,
      y: 0,
      action: handleMessenger,
    },
    {
      label: <WhatsappIcon className="rotate-45" size={20} />,
      x: 60,
      y: 0,
      action: handleWhatsApp,
    },
    {
      label: <PaperclipIcon className="rotate-45" size={20} />,
      x: 0,
      y: -60,
      action: handleCopy,
    },
    {
      label: <MailIcon className="rotate-45" size={20} />,
      x: 0,
      y: 60,
      action: handleMail,
    },
  ];

  return (
    <div className="gooey-wrapper">
      <button className="main gooey-button ">
        <ShareIcon size={25} className="rotate-45" />
      </button>

      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.action}
          className="item gooey-button"
          style={
            {
              "--x": `${item.x}px`,
              "--y": `${item.y}px`,
            } as React.CSSProperties
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
