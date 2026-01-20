import { authCredentials } from "@/providers";
import { AuthPage } from "@refinedev/antd";

const ForgotPasswordPage = () => {
  return (
    <div className="light-theme-only auth-container-fix">
      <AuthPage
        type="forgotPassword"
        title={false}
        formProps={{ initialValues: { authCredentials } }}
      />
    </div>
  );
};

export default ForgotPasswordPage;
