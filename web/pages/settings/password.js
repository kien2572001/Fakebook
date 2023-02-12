import MainLayout from "~/components/layouts/MainLayout";
import ChangePasswordForm from "~/components/user/forms/ChangePasswordForm";
import { parserUserCookies } from "~/ultis/parser";

export default function ChangePassword() {
  
    return (
      <MainLayout>
        <ChangePasswordForm />
      </MainLayout>
    );
  }