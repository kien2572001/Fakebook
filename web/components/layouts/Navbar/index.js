import react from "react";
import {
  Zap,
  Search,
  Home,
  Video,
  User,
  ShoppingBag,
  Bell,
  MessageSquare,
  Moon,
} from "react-feather";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import axios from "~/api/axios";
import AuthContext from "~/contexts/AuthContext";
import { useSelector } from "react-redux";
import { selectUser } from "~/store/userSlice";
import Notification from "./Notification";
import Pusher from "pusher-js";
import { Badge } from "antd";

export default function Navbar({ userData }) {
  const [dataPusher, setDataPusher] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [countUnread, setCountUnread] = useState(0);
  const user = userData;
  useEffect(() => {
    const pusher = new Pusher("61ced07f1c5be563dc8f", {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe(user.id);
    chanel.bind("signal", (data) => {
      setDataPusher([data, ...dataPusher]);
      setCountUnread(countUnread + 1);
    });
    return () => {
      pusher.unsubscribe(user.id);
    };
  });

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await axios.get(`/notifications/list`);
      if (res.status === 200) {
        setDataPusher(res.data.data);
      } else {
        console.log("error");
      }
    };
    fetchNotification();
  }, []);

  const handleShowNotification = () => {
    setShowNotification(!showNotification);
    setCountUnread(0);
  };

  return (
    <div className="navbar-container flex w-full h-[96px] justify-between	 justify-items-center relative">
      {showNotification && <Notification data={dataPusher} />}
      <div className="navbar-container flex h-full justify-items-center">
        <Link href="/" className="flex w-[280px] h-full] justify-items-center">
          {/* Nav logo box */}
          <div className="navbar-logo flex pl-[10px] justify-start">
            <div className="flex items-center mr-4">
              <Zap color="#10d876" size={44} />
            </div>
            <div className="navbar-logo-text h-full flex items-center">
              <span
                className="text-[32px] text-[#0055FF] font-fredoka font-semibold"
                style={{ letterSpacing: "1px" }}
              >
                Sociala.
              </span>
            </div>
          </div>
        </Link>
        {/* Input box */}
        <div className="ml-4 flex items-center">
          <div className="relative text-gray-400 bg-gray overflow-hidden">
            <div className="absolute top-[14px] left-4 opacity-20">
              <Search color="gray" size={20} />
            </div>
            <input
              type="text"
              className="text-xs font-medium border-0  pt-2 pb-2 pl-12 pr-4 w-[350px] h-[48px] rounded-full bg-[#EEEEEE] focus:outline-none "
              placeholder="Start typing to search.."
            />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ml-4">
          <Link href="/">
            <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
              <Home color="#adb5bd" size={25} />
            </div>
          </Link>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <Zap color="#adb5bd" size={25} />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <Video color="#adb5bd" size={25} />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <User color="#adb5bd" size={25} />
          </div>
        </div>
        {/* Menu icon */}
        <div className="text-gray-500 flex items-center p-2 ">
          <div className="flex items-center w-[50px] h-[50px] rounded-[50px]   bg-background justify-center ">
            <ShoppingBag color="#adb5bd" size={25} />
          </div>
        </div>
      </div>
      {/* Blue icon group  */}
      <div className="text-primary flex items-center mr-[15px]">
        <div
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => handleShowNotification()}
        >
          <Badge count={countUnread} overflowCount={99}>
            <Bell color="#05f" size={28} />
          </Badge>
        </div>
        <div className="p-2 ml-4 rounded-full hover:bg-gray-100">
          <MessageSquare color="#05f" size={28} />
        </div>
        <div className="p-2 ml-4 rounded-full hover:bg-gray-100">
          <Moon color="#05f" size={28} />
        </div>
        {/* Avatar */}
        <Link href="/defaultsettings">
          <div className="cursor-pointer select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                user?.avatar ||
                "https://fakebook-kien2572001.s3.ap-southeast-1.amazonaws.com/images/default/default-avatar.jpg"
              }
              alt="avatar"
              className="w-[40px] h-[40px] rounded-[40px] ml-4"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
