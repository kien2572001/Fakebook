import React from "react";
import styles from "~/styles/Main.module.css";
import { ArrowLeft } from "react-feather";

export default function SocialForm() {
  return (
    <div className="ml-[10px]">
        <div className="flex flex-col max-w-[800px] bg-white  rounded-[5px] ml-auto mr-auto mt-[10px] ">
            <div className="bg-[#0055ff] flex p-[24px] text-center rounded-t-[5px]">
                <ArrowLeft size={24} className="text-white" />
                <span className="text-sm text-white ml-[20px] font-semibold">Social Network</span>
            </div>
            <div className="p-[24px] flex">
                <form className="w-full">
                    <div className="flex flex-col laptop:flex-row laptop:mb-[16px] place-content-between w-full">
                    <div className="flex flex-col mb-[16px] w-full laptop:mr-[13px]">
                        <label htmlFor="facebook" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Facebook</label>
                        <input type="url" name="facebook" id="facebook" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    <div className="flex flex-col mb-[16px] w-full laptop:ml-[13px]">
                        <label htmlFor="twitter" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Twitter</label>
                        <input type="url" name="twitter" id="twitter" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    </div>
                    <div className="flex flex-col laptop:flex-row laptop:mb-[16px] place-content-between w-full">
                    <div className="flex flex-col mb-[16px] w-full laptop:mr-[13px]">
                        <label htmlFor="linkedin" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Linkedin</label>
                        <input type="url" name="linkedin" id="linkedin" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    <div className="flex flex-col mb-[16px] w-full laptop:ml-[13px]">
                        <label htmlFor="instargram" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Instagram</label>
                        <input type="url" name="instargram" id="instargram" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    </div>
                    <div className="flex flex-col laptop:flex-row laptop:mb-[16px] place-content-between w-full"> 
                    <div className="flex flex-col mb-[16px] w-full laptop:mr-[13px]">
                        <label htmlFor="flickr" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Flickr</label>
                        <input type="url" name="flickr" id="flickr" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    <div className="flex flex-col mb-[16px] w-full laptop:ml-[13px]">
                        <label htmlFor="github" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Github</label>
                        <input type="url" name="github" id="github" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    </div>
                    <div className="flex flex-col laptop:flex-row laptop:mb-[16px] place-content-between w-full">
                    <div className="flex flex-col mb-[16px] w-full laptop:mr-[13px]">
                        <label htmlFor="skype" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Skype</label>
                        <input type="url" name="skype" id="skype" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    <div className="flex flex-col mb-[16px] w-full laptop:ml-[13px]">
                        <label htmlFor="google" className="font-semibold text-[#343a40] text-[12px] mb-[5px]">Google</label>
                        <input type="url" name="google" id="google" className="border-gray-300 border-solid border-[1px] rounded-[5px] px-[6px] py-[12px] focus:outline-none focus:border-[#0055ff]"/>
                    </div>
                    </div>
                    <div className="bg-[#0055ff] max-w-[177px] flex text-center rounded-[5px]">
                        <button type="submit" className="text-white p-[16px] w-full h-full font-semibold">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
  );
}