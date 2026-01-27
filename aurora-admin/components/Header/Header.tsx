"use client";

import { CurrentUser } from "@/components";
import { Layout, Space } from "antd";

const Header = () => {
  return (
    <Layout.Header
      style={{ backgroundColor: "white" }}
      className="flex justify-end items-center py-0 px-6 sticky top-0 z-999"
    >
      <Space align="center" size="middle">
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
