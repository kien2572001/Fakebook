import React from "react";
import Navbar from "~/components/layouts/Navbar";
import Sidebar from "~/components/layouts/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className=" w-screen ">
      <div className="nav-container shadow-xs">
        <Navbar />
      </div>
      <div className=" bg-background w-screen flex">
        {/* Sidebar */}
        <div className="hidden laptop:block laptop:min-w-[280px]">
          <Sidebar />
        </div>
        <div className="h-screen ">{children}</div>
      </div>
    </div>
  );
}
