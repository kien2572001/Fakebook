import Link from "next/link";
import {
  Award,
  Globe,
  Home,
  Inbox,
  MapPin,
  MessageSquare,
  PieChart,
  Settings,
  Tv,
  User,
  Youtube,
  Zap,
  PlayCircle
} from "react-feather";
import { Popover, Button } from "antd";
export default function Sidebar({ userData }) {
  const contentGame = (
    <div>  
            <img src="https://cdn-icons-png.flaticon.com/512/528/528105.png" className="px-2 py-2 w-16 h-16 rounded-md" />
            <img src="https://upload.wikimedia.org/wikipedia/vi/0/0a/Flappy_Bird_icon.png" className="px-2 py-2 w-16 h-16 rounded-md" />
            <img src="https://play-lh.googleusercontent.com/tttjvR4K5iwNhHsY1u3IbAYnp4Bw7XT_Y3YjLKmSRb2ReYxjrOH0CbYm1LHeq4yofQ4" className="px-2 py-2 w-16 h-16 rounded-md" />
    </div>
  );
  return (
    // Sidebar
    <div className="px-[15px] w-full font-openSans">
      {/* New Feeds */}
      <div className="w-full flex flex-col my-2 pt-4 pb-1 bg-white rounded-[15px] shadow-[0_8px_30px_8px_rgba(0,0,0,0.05)]">
        <div className="text-xs text-gray-text font-semibold pl-[25px] mb-[5px] font-montserrat leading-[21px]">
          New Feeds
        </div>
        <div className="flex flex-col ">
          {/* Newsfeed button */}
          <div className="flex px-[15px] py-3 items-center max-h-[54px]">
            <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#0575e6] to-[#021b79]">
              <Tv size="20" color="white" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Newsfeed
            </div>
          </div>
          {/* Badges */}
          <div className="flex px-[15px] py-3 items-center max-h-[54px]">
            <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#e44d26] to-[#f16529]">
              <Award size="20" color="white" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Badges
            </div>
          </div>
          {/* Explore Stories */}
          <div className="flex px-[15px] py-3 items-center max-h-[54px]">
            <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#f2994a] to-[#f2c94c]">
              <Globe size="20" color="white" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Explore Stories
            </div>
          </div>
          {/* Popular Groups */}
          <div className="flex px-[15px] py-3 items-center max-h-[54px]">
            <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
              <Zap size="20" color="white" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              <Link href="/group">Popular Groups</Link>
            </div>
          </div>
          {/* Author Profile */}
          <div className="flex px-[15px] py-3 items-center max-h-[54px]">
            <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
              <User size="20" color="white" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold cursor-pointer">
              <Link href={`/profile/${userData.id}`}>Author Profile</Link>
            </div>
          </div>
        </div>
      </div>
      {/* End of newfeed */}
      {/* More pages */}
      <div className="w-full flex flex-col my-2 pt-4 pb-1 bg-white rounded-[15px] shadow-[0_8px_30px_8px_rgba(0,0,0,0.05)]">
        <div className="text-xs text-gray-text font-semibold pl-[25px] mb-[5px] font-montserrat leading-[21px]">
          More Pages
        </div>
        <div className="flex flex-col mb-4">
          {/* Email Box button */}
          <div className="flex px-[20px] py-3 items-center min-h-[54px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center mr-4 ">
              <Inbox size="28" color="blue" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Email Box
            </div>
          </div>
          {/* Game button */}
          <div className="flex px-[20px] py-3 items-center min-h-[54px]">
          <Popover placement="right" content={contentGame} trigger="click">
            <Button type="primary" shape="circle" className="w-[28px] h-[28px] flex justify-center items-center mr-4 " icon={<PlayCircle size="28" color="blue" />}>
            </Button>
          </Popover>
          <div className="text-[15px] text-[#888888] font-semibold">
              Game
            </div>
          </div>
          {/* Latest Event */}
          <div className="flex px-[20px] py-3 items-center min-h-[54px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center mr-4 ">
              <MapPin size="28" color="blue" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Latest Event
            </div>
          </div>
          {/* Live Stream */}
          <div className="flex px-[20px] py-3 items-center min-h-[54px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center mr-4 ">
              <Youtube size="28" color="blue" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Live Stream
            </div>
          </div>
        </div>
      </div>
      {/* End more pages */}
      {/* Account box */}
      <div className="w-full flex flex-col my-2 pt-4 pb-1 bg-white rounded-[15px] shadow-[0_8px_30px_8px_rgba(0,0,0,0.05)]">
        <div className="text-xs text-gray-text font-semibold pl-[25px] mb-[5px] font-montserrat leading-[21px]">
          Account
        </div>
        <div className="flex flex-col mb-4">
          {/* Settings button */}
          <Link href="/defaultsettings">
            <div className="flex px-[20px] py-2 items-center min-h-[44px]">
              <div className="w-[20px] h-[20px] flex justify-center items-center mr-4 ">
                <Settings size="20" color="#adb5bd" />
              </div>
              <div className="text-[15px] text-[#888888] font-semibold">
                Settings
              </div>
            </div>
          </Link>
          {/* Analytics button */}
          <div className="flex px-[20px] py-2 items-center min-h-[44px]">
            <div className="w-[20px] h-[20px] flex justify-center items-center mr-4 ">
              <PieChart size="20" color="#adb5bd" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Analytics
            </div>
          </div>
          {/* Chat button */}
          <Link href="/testChat">
            <div className="flex px-[20px] py-2 items-center min-h-[44px]">
              <div className="w-[20px] h-[20px] flex justify-center items-center mr-4 ">
                <MessageSquare size="20" color="#adb5bd" />
              </div>
              <div className="text-[15px] text-[#888888] font-semibold">
                Chat
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* End of account box */}
    </div>
  );
}
