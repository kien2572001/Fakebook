import react from "react";
import {
  Zap,
  Search,
  Home,
  Video,
  User,
  ShoppingBag,
  Bell,
  MessageSquare,
  Moon,
} from "react-feather";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "~/api/axios";

export default function Navbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get("/users/my-information");
      console.log(res);
      setUserData(res.data.data);
    };
    getUserData();
  }, []);

  return (
    <div className="navbar-container flex w-full h-[96px] justify-between	 justify-items-center">
      <div className="navbar-container flex h-full justify-items-center">
        <Link href="/" className="flex w-[280px] h-full] justify-items-center">
          {/* Nav logo box */}
          <div className="navbar-logo flex pl-[10px] justify-start">
            <div className="flex items-center mr-4">
              <Zap color="#10d876" size={44} />
            </div>
            <div className="navbar-logo-text h-full flex items-center">
              <span
                className="text-[32px] text-[#0055FF] font-fredoka font-semibold"
                style={{ letterSpacing: "1px" }}
              >
                Sociala.
              </span>
            </div>
          </div>
        </Link>
        {/* Input box */}
        <div className="ml-4 flex items-center">
          <div className="relative text-gray-400 bg-gray overflow-hidden">
            <div className="absolute top-[14px] left-4 opacity-20">
              <Search color="gray" size={20} />
            </div>
            <input
              type="text"
              className="text-xs font-medium border-0  pt-2 pb-2 pl-12 pr-4 w-[350px] h-[48px] rounded-full bg-[#EEEEEE] focus:outline-none "
              placeholder="Start typing to search.."
            />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ml-4">
          <Link href="/">
            <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
              <Home color="#adb5bd" size={25} />
            </div>
          </Link>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <Zap color="#adb5bd" size={25} />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <Video color="#adb5bd" size={25} />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <User color="#adb5bd" size={25} />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <ShoppingBag color="#adb5bd" size={25} />
          </div>
        </div>
      </div>
      {/* Blue icon group  */}
      <div className="text-primary flex items-center mr-[15px]">
        <div className="p-2 ">
          <Bell color="#05f" size={28} />
        </div>
        <div className="p-2 ml-4">
          <MessageSquare color="#05f" size={28} />
        </div>
        <div className="p-2 ml-4">
          <Moon color="#05f" size={28} />
        </div>
        {/* Avatar */}
        <Link href="/defaultsettings">
          <div className="cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                userData?.avatar ||
                "https://fakebook-kien2572001.s3.ap-southeast-1.amazonaws.com/images/default/default-avatar.jpg"
              }
              alt="avatar"
              className="w-[40px] h-[40px] rounded-[40px] ml-4"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
