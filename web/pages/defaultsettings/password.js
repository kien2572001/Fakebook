import React from "react";
import { Lock } from "react-feather";
import axios from "~/api/axios";
import { useEffect } from "react";

const ChangePassword = () => {
    useEffect(() => {
        let temp = async () => {
          let res = await axios.get("/web-init");
          console.log(res);
        };
        temp();
      }, []);
      
  return (
    <div>
    {/*Home button*/}   
    <div className="relative top-[12px] left-[8px] h-1">
        <div className="w-[150px] ">
        <a href="/..">
            <span className="text-2xl laptop:text-[32px] font-semibold  ml-[5px] text-[#0055ff] font-fredoka tracking-[1px]">
            Sociala.
          </span>
        </a>
        </div>
    </div>
    <div className="flex h-screen focus:outline-none">
      <div className="w-4/10 hidden laptop:block h-full">
        <img src="http://sociala.uitheme.net/assets/images/login-bg-2.jpg" alt="changepassword-pic" className="h-full"/>
      </div>
      <div className="w-5/10 m-auto flex justify-center items-center">
      <div className="flex flex-col min-w-[380px] max-w-[400px] mx-auto p-4">
          {/* Header */}
          <h2 className="mb-4 text-4xl font-bold">Change your password</h2>
          {/* Input Old password */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Lock color="#adb5bd" size={22} />
            </div>
            <input
              type="text"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Old Password"
            />
          </div>
          {/* Input New password */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Lock color="#adb5bd" size={22} />
            </div>
            <input
              type="password"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="New Password"
            />
          </div>
          {/* Term and conditions */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 ml-1 border-[1px] border-[#eee] rounded"
              />
              <span className="text-sm text-gray-text">Accept Term and Conditions</span>
            </div>
          </div>
          {/* Change button */}
          <button className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold border-0 mb-1 text-[#fff] bg-[#343a40] text-sm ">
            Change Password
          </button>
    </div>
    </div>
    </div>
    </div>
  );
}

export default ChangePassword