import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
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
