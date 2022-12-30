import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="container w-full">
      <div className="nav-container"></div>
      <div className="content-container">
        <div className="">{/* Sidebar */}</div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
