"use client";
import { Popover, Button } from "antd";
import { CustomAvatar, Text, AccountSettings } from "@/components";
import { useGetIdentity } from "@refinedev/core";
import type { User } from "@/graphql/schema.types";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div className=" flex flex-col">
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <div className="p-1 flex flex-col gap-1 border-t border-[#d9d9d9]">
        <Button
          type="text"
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        style={{ padding: 0, zIndex: 999 }}
        content={content}
      >
        <CustomAvatar
          name={user?.name || ""}
          src={user?.avatarUrl}
          size="default"
          className="curosr-pointer"
        />
      </Popover>
      {user && isOpen && (
        <AccountSettings open={isOpen} userId={user.id} setOpen={setIsOpen} />
      )}
    </>
  );
};

export default CurrentUser;
