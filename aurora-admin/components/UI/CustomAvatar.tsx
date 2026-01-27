import { getNameInitials } from "@/utils";
import { CustomAvatarProps } from "@/utils/interfaces";
import { Avatar } from "antd";

const CustomAvatar = ({ name, style, ...rest }: CustomAvatarProps) => {
  return (
    <Avatar
      alt={name}
      size="small"
      className="flex items-center border-none bg-[#87d068]"
      style={{ ...style }}
      {...rest}
    >
      {getNameInitials(name || "")}
    </Avatar>
  );
};

export default CustomAvatar;
