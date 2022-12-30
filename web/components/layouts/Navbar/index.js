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

export default function Navbar() {
  return (
    <div className="navbar-container flex w-screen h-[96px] justify-between	 justify-items-center">
      <div className="navbar-container flex h-full justify-items-center">
        <div className="flex w-[280px] h-full] justify-items-center">
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
        </div>
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
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <Home color="#adb5bd" size={25} />
          </div>
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
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="http://sociala.uitheme.net/assets/images/profile-4.png"
            alt="avatar"
            className="w-[40px] h-[40px] rounded-[40px] ml-4"
          />
        </div>
      </div>
    </div>
  );
}
