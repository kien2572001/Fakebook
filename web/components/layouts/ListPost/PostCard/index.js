import react from "react";
import styles from "~/styles/Main.module.css";
import {
  MoreHorizontal,
  ThumbsUp,
  Heart,
  MessageCircle,
  Share2,
} from "react-feather";
export default function PostCard() {
  return (
    <div className={styles.card}>
      {/* Avatar box */}
      <div className="flex justify-between">
        <div className="flex">
          {/* Avatar */}
          <div className="w-[45px] h-[45px] mb-4 mr-4">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="avatar"
              className="w-full h-full rounded-[45px]"
            />
          </div>
          {/* Name */}
          <div className=" text-xs mt-1 mb-2">
            <span className="text-default font-bold  block">John Doe</span>
            <span className="text-gray-500 block">1 hour ago</span>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="w-[45px] h-[45px] rounded-[45px] flex justify-center items-center bg-background cursor-pointer">
            <MoreHorizontal size={23} />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="text-xs mb-2 text-gray-text break-all leading-[26px] font-medium ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
        consequuntur voluptatum quos natus quas. Quisquam, quae. Quisquam
      </div>
      {/* Image */}
      <div className="mb-6 w-full">
        <img
          src="http://sociala.uitheme.net/assets/images/t-10.jpg"
          alt="avatar"
          className="w-full  rounded-[15px]"
        />
      </div>
      {/* Like, Comment, Share */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex">
          {/* Like */}
          <div className=" flex  justify-start items-center mr-2">
            <div className="w-[25px] h-[25px] mr-2 flex justify-center rounded-[25px] items-center bg-gradient-to-r from-[#05f] to-[#09f]">
              <ThumbsUp size={16} color="white" className="" />
            </div>
            <div className="w-[25px] h-[25px] mr-2 flex justify-center rounded-[25px] items-center bg-gradient-to-r from-[#e44d26] to-[#f16529]">
              <Heart size={16} color="white" className="" />
            </div>
            <div className="font-semibold">2.8K Like</div>
          </div>
          {/* Comment */}
          <div className=" flex justify-start items-center mr-2 ">
            <div className="w-[25px] h-[25px] mr-2 flex justify-center rounded-[25px] items-center ">
              <MessageCircle size={25} color="black" className="" />
            </div>
            <div className="font-semibold">22 Comment</div>
          </div>
        </div>
        {/* Share */}
        <div className=" flex justify-end items-center mr-2 font-semibold">
          <Share2 size={25} color="black" className="" />
          <span className=" ml-2">Share</span>
        </div>
      </div>
    </div>
  );
}
