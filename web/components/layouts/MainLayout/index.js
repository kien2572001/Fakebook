import Navbar from "~/components/layouts/Navbar";
import Sidebar from "~/components/layouts/Sidebar";
import BottomBar from "../BottomBar";
import ContactBar from "../ContactBar";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "~/store/userSlice";


export default function MainLayout({ children,userData }) {

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    //console.log("userData", userData);
    dispatch(setUser(userData));
  }, []);


  return (
    <div className=" w-full relative min-h-screen bg-background">
      <div className=" shadow-xs fixed top-0 left-0 right-0 bg-white z-10">
        <Navbar />
      </div>
      <div className=" w-full flex z">
        {/* Sidebar */}
        <div className="hidden laptop:block laptop:min-w-[280px] fixed top-0 pt-[96px]">
          <Sidebar userData={userData} />
        </div>
        <div className="overflow-auto grow pt-[96px] laptop:pl-[280px] desktop:pr-[280px] min-h-screen">{children}</div>
        <div className="hidden desktop:block desktop:w-[280px] pt-[96px] fixed top-0 px-[0.9375rem] right-0 bottom-0">
          <ContactBar />
        </div>
      </div>
      <div className="sticky bottom-0">
        <BottomBar />
      </div>
    </div>
  );
}
