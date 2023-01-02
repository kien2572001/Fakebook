import React from "react";
import axios from "~/api/axios";
import { useEffect } from "react";
import { Mail, Lock } from "react-feather";
import Image from "next/image";

import Facebook from "../../public/icon-2.png";
import Google from "../../public/icon-1.png";
const Login = () => {
  useEffect(() => {
    let temp = async () => {
      let res = await axios.get("/web-init");
      console.log(res);
    };
    temp();
  }, []);

  return (
    <div className="w-full h-full ">
      {/* Left block */}
      <div></div>
      {/* Right block */}
      <div className="flex items-center h-screen">
        {/* Login form */}
        <div className="flex flex-col min-w-[380px] max-w-[400px] mx-auto p-4">
          {/* Header */}
          <h2 className="mb-4 text-3xl font-bold">Login into your account</h2>
          {/* Input email */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Mail color="#adb5bd" size={22} />
            </div>
            <input
              type="text"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Your Email Address"
            />
          </div>
          {/* Input password */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Lock color="#adb5bd" size={22} />
            </div>
            <input
              type="password"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Password"
            />
          </div>
          {/* Remember and forgot */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 ml-1 border-[1px] border-[#eee] rounded"
              />
              <span className="text-sm text-gray-text">Remember me</span>
            </div>
            <div className="text-sm font-semibold text-[#495057]">
              Forgot your Password?
            </div>
          </div>
          {/* Login button */}
          <button className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold border-0 mb-1 text-[#fff] bg-[#343a40] text-sm ">
            Login
          </button>
          {/* Register button */}
          <div className="text-sm font-medium leading-[32px] text-gray-text">
            Don't have an account?{" "}
            <span className="text-[#1E74FD] font-bold ml-1">Register</span>
          </div>
          {/* Social sign in */}
          <div className="mt-2 flex flex-col">
            <h6 className="text-sm font-semibold text-gray-text mb-4 mx-auto">
              Or, Sign in with your social account
            </h6>
            {/* Google */}
            <div className="w-full h-[60px] flex items-center bg-[#0d66ff] rounded-[7px] cursor-pointer mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="flex items-center mr-[60px] mb-1 ml-2">
                <Image src={Google} alt="Google" width={40} height={40} />
              </div>
              <span className="leading-[60px] font-semibold text-white text-sm  ">
                Sign in with Google
              </span>
            </div>
            {/* Facebook */}
            <div className="w-full h-[60px] flex items-center bg-[#3b5999] rounded-[7px] cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="flex items-center mr-[60px] mb-1 ml-2">
                <Image src={Facebook} alt="Google" width={40} height={40} />
              </div>
              <span className="leading-[60px] font-semibold text-white text-sm  ">
                Sign in with Facebook
              </span>
            </div>
          </div>
        </div>
        {/* End login form */}
      </div>
    </div>
  );
};

export default Login;
