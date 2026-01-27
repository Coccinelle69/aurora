import { LogoutIcon } from "@/icons";
import { useLogout } from "@refinedev/core";
import { theme } from "antd";

const LogoutButton = () => {
  const { mutate: logout } = useLogout();
  const { token } = theme.useToken();

  return (
    <button
      style={{ fontFamily: token.fontFamily }}
      className="flex px-4  w-full "
      onClick={() => logout()}
    >
      <LogoutIcon />
      <span className="ml-2.5 opacity-65 text-base duration-300 ease-in-out hover:cursor-pointer hover:opacity-100">
        Logout
      </span>
    </button>
  );
};

export default LogoutButton;
