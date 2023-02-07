import { data } from "autoprefixer";
import React, { useEffect, useState, useRef } from "react";
import {
  X,
  Minus,
  Video,
  Phone,
  Image,
  Smile,
  Mic,
  ThumbsUp,
  ArrowUpCircle,
} from "react-feather";
import { useSelector } from "react-redux";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "~/api/axios";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function Chat({ targetData, handleCloseChatBox }) {
  const messageEndRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const [chanelName, setChanelName] = React.useState("chat" + user.id);
  const [currentMessage, setCurrentMessage] = useState("");
  const [message, setMessage] = useState([]);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/chat/list`, {
        params: {
          source_id: user.id,
          target_id: targetData.id,
        },
      });
      if (res.status === 200) {
        setMessage(res.data.data);
      } else {
        console.log("error");
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    //Pusher.logToConsole = true;
    const pusher = new Pusher("61ced07f1c5be563dc8f", {
      cluster: "ap1",
    });

    const chanel = pusher.subscribe(`${chanelName}`);
    chanel.bind("message", (data) => {
      setMessage((message) => [...message, data]);
    });
    return () => {
      pusher.unsubscribe(chanelName);
    };
  });

  useEffect(() => {
    console.log("message:", message);
  }, [message]);

  const insertMessages = async (e) => {
    let data = {
      user_src: user.id,
      user_target: targetData.id,
      message: currentMessage,
    };
    setMessage((message) => [...message, data]);
    setCurrentMessage("");
    const res = await axios.post(`/chat/sendMessage`, data);
    if (res.status === 200) {
      //
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="block absolute w-[338px] h-[455px] border-black right-[100px] bottom-0 z-30">
        <div className="flex flex-row px-2 py-2 bg-[#0084FF] rounded-t-lg shadow-lg justify-between">
          {/* Head*/}
          <div className="flex relative items-center">
            <div className="block relative">
              <Link href={`/profile/${targetData.id}`}>
                <img
                  className="rounded-full w-10 h-10"
                  src={targetData.avatar}
                />
                <div className="absolute bg-[#31a24c] w-3.5 h-3.5 rounded-full border-2 border-white-100 bottom-0 right-0"></div>
              </Link>
            </div>
            <div className="ml-4">
              <Link href={`/profile/${targetData.id}`}>
                <p className="text-white font-sans inherit text-sm font-semibold">
                  {targetData.name}
                </p>
              </Link>
              <p className="text-white font-sans font-normal text-xs">Online</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="px-2">
              <Phone color="#FFFFFF" size={20} />
            </div>
            <div className="px-2">
              <Video color="#FFFFFF" size={22} />
            </div>
            <div className="px-2">
              <Minus color="#FFFFFF" size={22} />
            </div>
            <div onClick={handleCloseChatBox} className="cursor-pointer">
              <X color="#FFFFFF" size={22} />
            </div>
          </div>
        </div>
        {/* Message */}
        <div className="h-[340px] block overflow-auto bg-[#FFFFFF] ">
          <div className="py-2 px-3 ">
            <div className="flex justify-center mb-2">
              <p className="text-gray-400 text-xs">Hôm nay</p>
            </div>
          </div>
          {message &&
            message.map((item) => {
              if (item.user_src != user.id)
                return (
                  <div className="flex mb-2 px-2 py-1 items-end" key={uuidv4()}>
                    <div className="block px-2">
                      <Link href={`/profile/${targetData.id}`}>
                        <img
                          className="w-6 h-6 rounded-full  bottom-0"
                          src={targetData.avatar}
                        />
                      </Link>
                    </div>
                    <div className="max-w-200 mx-2">
                      <p className="font-sans font-normal text-xs">
                        {targetData.name}
                      </p>
                      <div className="bg-[#e4e6eb] max-w-200 rounded-full">
                        <p className="text-xs px-2 max-w-200 py-1 block">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              return (
                <div className="flex mb-2 px-2 py-3 justify-end" key={uuidv4()}>
                  <div className="max-w-200 mx-2">
                    <div className="bg-[#0084FF] max-w-200 rounded-full">
                      <p className="text-xs px-2 py-1 max-w-200 block text-white">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Input */}
        <div className="flex flex-row px-2 py-2 bg-[#FFFFFF] rounded-b-lg shadow-lg items-center">
          {currentMessage.length === 0 && (
            <div className="px-2">
              <Image color="#0084FF" size={22} />
            </div>
          )}
          {currentMessage.length === 0 && (
            <div className="px-2">
              <Smile color="#0084FF" size={22} />
            </div>
          )}
          {currentMessage.length === 0 && (
            <div className="px-2">
              <Mic color="#0084FF" size={22} />
            </div>
          )}
          <input
            className="w-full px-2 py-2 rounded-full bg-[#f0f2f5] focus:outline-none"
            placeholder="Nhập tin nhắn..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentMessage.length > 0) {
                insertMessages();
              }
            }}
          ></input>
          {currentMessage.length == 0 && (
            <div className="px-2">
              <ThumbsUp color="#0084FF" size={22} />
            </div>
          )}
          {currentMessage.length > 0 && (
            <div className="px-2">
              <button onClick={insertMessages}>
                <ArrowUpCircle color="#0084FF" size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
