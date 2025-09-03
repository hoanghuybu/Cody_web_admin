import { message } from "antd";
import { useEffect } from "react";
import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  useEffect(() => {
    const error = sessionStorage.getItem("authError");
    if (error) {
      message.error(error); // Hoặc show toast
      sessionStorage.removeItem("authError");
    }
  }, []);
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | Cody Admin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for Cody Admin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
