import Navbar from "~/components/layouts/Navbar";
import Sidebar from "~/components/layouts/Sidebar";
import BottomBar from "../BottomBar";

export default function MainLayout({ children }) {
  return (
    <div className=" w-full relative">
      <div className="nav-container shadow-xs">
        <Navbar />
      </div>
      <div className=" bg-background w-full flex">
        {/* Sidebar */}
        <div className="hidden laptop:block laptop:min-w-[280px]">
          <Sidebar />
        </div>
        <div className="h-screen grow">{children}</div>
      </div>
      <div className="sticky bottom-0">
        <BottomBar />
      </div>
    </div>
  );
}
