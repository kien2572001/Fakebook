import react from "react";
import { Tv, Globe, Award, Zap, User } from "react-feather";
import { Inbox, Home, MapPin, Youtube } from "react-feather";

export default function Sidebar() {
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
              Popular Groups
            </div>
          </div>
          {/* Author Profile */}
          <div className="flex px-[15px] py-3 items-center max-h-[54px]">
            <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
              <User size="20" color="white" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Author Profile
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
          {/* Near Hotel button */}
          <div className="flex px-[20px] py-3 items-center min-h-[54px]">
            <div className="w-[28px] h-[28px] flex justify-center items-center mr-4 ">
              <Home size="28" color="blue" />
            </div>
            <div className="text-[15px] text-[#888888] font-semibold">
              Near Hotel
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
    </div>
  );
}
