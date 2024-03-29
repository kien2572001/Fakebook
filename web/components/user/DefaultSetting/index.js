import MainLayout from "~/components/layouts/MainLayout";
import {
  Home,
  MapPin,
  Twitter,
  CreditCard,
  Inbox,
  Bell,
  HelpCircle,
  Lock,
} from "react-feather";
import axios from "~/api/axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function DefaultSetting({ userData }) {
  const router = useRouter();
  const handleLogout = async () => {
    let res = await axios.post("/auth/logout");
    if (res.status === 200) {
      router.push("/auth/login");
    }
  };
  return (
    <MainLayout userData={userData}>
      <div className="px-[15px] w-full mt-3 laptop:px-0 laptop:max-w-[800px] laptop:mx-auto">
        <div className="w-full p-6 laptop:p-12 bg-white shadow-[0_0.5rem_1rem_0.5rem_rgba(0,0,0,0.03)] flex flex-col items-center">
          <div className="w-full mb-6 text-lg mobile:text-[2rem] font-bold self-start	">
            Settings
          </div>
          <div className="w-full text-sm text-gray-text self-start font-semibold mb-2">
            General
          </div>
          {/* General box */}
          {/* Account infomation */}
          <Link
            href="/settings/accountinformation"
            className="w-full flex py-2 justify-start border-solid border-b border-[#E1E1F0] cursor-pointer"
          >
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#05f] to-[#09f]">
              <Home size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px]">
              Account Information
            </div>
          </Link>
          {/* Save Address */}
          <div className="w-full flex py-2 justify-start border-solid border-b border-[#E1E1F0] cursor-pointer">
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#f2994a] to-[#f2c94c]">
              <MapPin size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px]">Saved Address</div>
          </div>
          {/* Social Account */}
          <div className="w-full flex py-2 justify-start mb-6 cursor-pointer">
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#e44d26] to-[#f16529]">
              <Twitter size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px]">Social Account</div>
          </div>
          {/* Account */}
          <div className="w-full text-sm text-gray-text self-start font-semibold mb-2">
            Account
          </div>
          {/* My cards */}
          <div className="w-full flex py-2 justify-start border-solid border-b border-[#E1E1F0] cursor-pointer">
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
              <CreditCard size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px]">My Cards</div>
          </div>
          {/* Password */}
          <Link
            href="/settings/password"
            className="w-full flex py-2 justify-start border-solid border-b border-[#E1E1F0] cursor-pointer"
          >
             <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#0575e6] to-[#021b79] mb-6">
                <Inbox size={22} color="white" />
              </div>
              <div className="font-semibold leading-[45px]">Password</div>
          </Link>
          {/* Other */}
          <div className="w-full text-sm text-gray-text self-start font-semibold mb-2">
            Other
          </div>
          {/* Notification */}
          <div className="w-full flex py-2 justify-start border-solid border-b border-[#E1E1F0] cursor-pointer">
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#f2994a] to-[#f2c94c]">
              <Bell size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px]">Notification</div>
          </div>
          {/* Help */}
          <div className="w-full flex py-2 justify-start border-solid border-b border-[#E1E1F0] cursor-pointer">
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#05f] to-[#09f]">
              <HelpCircle size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px]">Help</div>
          </div>
          {/* Logout */}
          <div
            className="w-full flex py-2 justify-start mb-6 cursor-pointer"
            onClick={handleLogout}
          >
            <div className="bg-blue-500 w-[45px] h-[45px] rounded-[45px] flex items-center justify-center mr-4 bg-gradient-to-r from-[#e44d26] to-[#f16529]">
              <Lock size={22} color="white" />
            </div>
            <div className="font-semibold leading-[45px] hover:text-[#40a9ff]">Logout</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
