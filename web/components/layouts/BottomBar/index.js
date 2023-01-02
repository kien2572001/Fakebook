import react from "react";
import { Home, Package, Layout, Layers } from "react-feather";

export default function BottomBar() {
  return (
    <div className="laptop:hidden w-full h-[56px] bg-gradient-to-r from-[#05f] to-[#09f] flex justify-between items-center px-1">
      <div className="py-[6px] px-[20px]">
        <Home size="25" color="white" />
      </div>
      <div className="py-[6px] px-[20px]">
        <Package size="25" color="white" />
      </div>
      <div className="py-[6px] px-[20px]">
        <Layout size="25" color="white" />
      </div>
      <div className="py-[6px] px-[20px]">
        <Layers size="25" color="white" />
      </div>
      <div className="py-[6px] px-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="http://sociala.uitheme.net/assets/images/profile-4.png"
          alt="avatar"
          className="w-[30px] h-[30px] rounded-[30px] "
        />
      </div>
    </div>
  );
}
