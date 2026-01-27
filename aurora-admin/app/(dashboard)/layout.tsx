"use client";
import { NavigateToResource } from "@refinedev/nextjs-router";
import { Authenticated, useIsAuthenticated, useMenu } from "@refinedev/core";
import { Header, LogoutButton } from "@/components";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: auth } = useIsAuthenticated();
  const { menuItems } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    if (auth && !auth.authenticated) {
      redirect("/login");
    }
  }, [auth]);
  const items = menuItems.map((item) => ({
    key: item.route || item.key,
    icon: item.icon,
    label: <Link href={item.route ?? "/"}>{item.label}</Link>,
    style: { marginBottom: "12px", padding: "12px 16px" },
  }));
  return (
    <Authenticated
      key="authenticated-layout"
      fallback={<NavigateToResource resource="/login" />}
    >
      <Layout
        style={{
          minHeight: "90vh",
          width: "90vw",
          margin: "5vh auto",
          opacity: 0.9,
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Sider breakpoint="lg" collapsedWidth="0" className="p-5" width={250}>
          <div style={{ color: "white", padding: "16px", fontWeight: "bold" }}>
            AURORA ADMIN
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            items={items}
            style={{ fontSize: "16px" }}
          />
          <LogoutButton />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ padding: "24px", minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Authenticated>
  );
}
