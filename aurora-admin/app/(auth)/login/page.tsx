import { GoogleIcon } from "@/icons";
import { authCredentials } from "@/providers";
import { AuthPage } from "@refinedev/antd";

const LoginPage = () => {
  return (
    <div className="light-theme-only auth-container-fix">
      <AuthPage
        type="login"
        title={false}
        formProps={{ initialValues: { authCredentials } }}
        providers={[
          {
            name: "google",
            label: "Google",
            icon: <GoogleIcon color="original" />,
          },
        ]}
      />
    </div>
  );
};

export default LoginPage;
