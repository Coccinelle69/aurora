import { GoogleIcon } from "@/icons";
import { authCredentials } from "@/providers";
import { AuthPage } from "@refinedev/antd";

const LoginPage = () => {
  return (
    <div className="relative">
      <AuthPage
        type="login"
        title={
          <h1 className="font-logo text-8xl text-white mb-8 drop-shadow-xl">
            Aurora
          </h1>
        }
        wrapperProps={{
          style: {
            background: "transparent",
            backgroundColor: "transparent",
          },
        }}
        contentProps={{
          style: {
            background: "rgba(255, 255, 255, 0.2)",
            maxWidth: "400px",
            margin: "0 auto",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            padding: "20px",
          },
        }}
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
