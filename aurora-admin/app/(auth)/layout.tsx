import { BackgroundImage } from "@/components";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BackgroundImage>{children}</BackgroundImage>
    </div>
  );
}
