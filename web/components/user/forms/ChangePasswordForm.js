import react from "react";
import styles from "~/styles/Main.module.css";
import { ArrowLeft } from "react-feather";
import Link from "next/link";
import axios from "~/api/axios";
import { useRouter } from "next/router";
export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = react.useState("");
  const [newPassword, setNewPassword] = react.useState("");
  const [confirmPassword, setConfirmPassword] = react.useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/auth/change-password", {
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    if (res.status === 200) {
      alert("Password changed successfully");
      router.push("/defaultsettings");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="ml-[10px]">
      <div className="flex flex-col max-w-[800px] bg-white  rounded-[5px] ml-auto mr-auto mt-[10px]">
        <div className="bg-[#0055ff] flex p-[24px] text-center rounded-t-[5px]">
          <Link href="/defaultsettings">
            <ArrowLeft size={24} className="text-white" />
          </Link>
          <span className="text-sm text-white ml-[20px] font-semibold">
            Change Password
          </span>
        </div>
        <div className="p-[24px] flex">
          <form className="w-full">
            <div className="flex flex-col mb-[16px]">
              <label
                htmlFor="currentPassword"
                className="font-semibold text-[#343a40] text-[12px] mb-[5px]"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-[16px]">
              <label
                htmlFor="changePassword"
                className="font-semibold text-[#343a40] text-[12px] mb-[5px]"
              >
                Change Password
              </label>
              <input
                type="password"
                name="changePassword"
                id="changePassword"
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"
              />
            </div>
            <div className="flex flex-col mb-[16px]">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-[#343a40] text-[12px] mb-[5px]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"
              />
            </div>
            <div className="bg-[#0055ff] max-w-[177px] flex text-center rounded-[5px]">
              <button
                type="submit"
                className="text-white p-[16px] w-full h-full font-semibold"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
