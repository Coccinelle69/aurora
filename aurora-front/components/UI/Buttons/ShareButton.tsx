"use client";
import {
  MailIcon,
  MessengerIcon,
  PaperclipIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/icons";
import { useMouse } from "@/utils/hooks";
import { useTranslation } from "react-i18next";
import { useState } from "react"; // Added to track menu state for ARIA

export default function ShareButton() {
  const { t } = useTranslation();
  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  );
  const isMouse = useMouse();
  const [isOpen, setIsOpen] = useState(false); // Track if gooey menu is "open"

  const handleMobileShare = async () => {
    try {
      await navigator.share({
        title: "Aurora Apartment – Zukve, Croatia",
        text: t("shareText"),
        url: window.location.href,
      });
    } catch (err) {
      console.log("Share failed", err);
    }
  };

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
    alert(t("linkCopied") || "Link copied");
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
      label: (
        <MessengerIcon className="rotate-45" size={20} aria-hidden="true" />
      ),
      ariaLabel: "Messenger",
      x: -60,
      y: 0,
      action: handleMessenger,
    },
    {
      label: (
        <WhatsappIcon className="rotate-45" size={20} aria-hidden="true" />
      ),
      ariaLabel: "WhatsApp",
      x: 60,
      y: 0,
      action: handleWhatsApp,
    },
    {
      label: (
        <PaperclipIcon className="rotate-45" size={20} aria-hidden="true" />
      ),
      ariaLabel: t("copyLink") || "Copy Link",
      x: 0,
      y: -60,
      action: handleCopy,
    },
    {
      label: <MailIcon className="rotate-45" size={20} aria-hidden="true" />,
      ariaLabel: t("email") || "Email",
      x: 0,
      y: 60,
      action: handleMail,
    },
  ];

  return (
    <div
      className="gooey-wrapper"
      id="share-menu"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <button
        className="main gooey-button"
        onClick={!isMouse ? handleMobileShare : undefined}
        aria-label={t("shareText") || "Share this page"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="share-menu"
        role="menuitem"
      >
        <ShareIcon size={25} className="rotate-45" aria-hidden="true" />
      </button>

      {isMouse &&
        items.map((item, i) => (
          <button
            role="menuitem"
            key={i}
            onClick={item.action}
            aria-label={item.ariaLabel}
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
