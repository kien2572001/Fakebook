import React from "react";
import Navbar from "~/components/layouts/Navbar";
import Sidebar from "~/components/layouts/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className=" w-screen">
      <div className="nav-container shadow-xs">
        <Navbar />
      </div>
      <div className="content-container flex">
        {/* Sidebar */}
        <div className="hidden laptop:inline-block laptop:w-[280px] bg-red-500">
          <Sidebar />
        </div>
        <div className="bg-background w-screen h-screen ">{children}</div>
      </div>
    </div>
  );
}
