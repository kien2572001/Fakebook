import Navbar from "~/components/layouts/Navbar";
import Sidebar from "~/components/layouts/Sidebar";
import BottomBar from "../BottomBar";

export default function MainLayout({ children }) {
  return (
    <div className=" w-full relative min-h-screen bg-background">
      <div className=" shadow-xs fixed top-0 left-0 right-0 bg-white z-10">
        <Navbar />
      </div>
      <div className=" w-full flex z">
        {/* Sidebar */}
        <div className="hidden laptop:block laptop:min-w-[280px] fixed top-0 pt-[96px]">
          <Sidebar />
        </div>
        <div className="overflow-auto grow pt-[96px] laptop:pl-[280px] min-h-screen">{children}</div>
      </div>
      <div className="sticky bottom-0">
        <BottomBar />
      </div>
    </div>
  );
}
