import { Popover, Button } from "antd";
import { CustomAvatar } from "@/components";
import { useGetIdentity } from "@refinedev/core";
import type { User } from "@/graphql/schema.types";

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        style={{ padding: 0, zIndex: 999 }}
      >
        <CustomAvatar
          name=""
          src={user?.avatarUrl}
          size="default"
          className="poiner"
        />
      </Popover>
    </>
  );
};

export default CurrentUser;
