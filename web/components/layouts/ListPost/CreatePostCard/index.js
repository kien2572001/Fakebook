import react from "react";
import styles from "~/styles/Main.module.css";
import { Edit3, Video, Image, Camera, MoreHorizontal } from "react-feather";
export default function CreatePostCard() {
  return (
    <div className={styles.card}>
      {/* Create post button */}
      <div className="flex justify-start items-center text-xs	">
        <div className="text-primary w-[35px] h-[35px] rounded-[35px] bg-background flex items-center justify-center mr-2 ">
          <Edit3 size={18} />
        </div>
        <span className="text-gray-500 font-bold opacity-40">Create Post</span>
      </div>
      {/* Textarea box */}
      <div className="relative mt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="http://sociala.uitheme.net/assets/images/profile-4.png"
          alt="avatar"
          className="w-[30px] h-[30px] rounded-[30px] ml-1 mt-1 absolute"
        />
        <textarea
          className={styles.createPostTextarea}
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      {/* Video, Image, Camera button */}
      <div className="flex justify-between items-center mt-2 text-xs ">
        {/* Left */}
        <div className="flex justify-start items-center">
          <div className="pr-6 text-danger flex items-center cursor-pointer">
            <Video size={22} className="mr-2"/>
            <span className="hidden mobile:inline-block text-gray-500 font-semibold ">
                Live Video
            </span>
          </div>
          <div className="pr-6 text-success flex items-center cursor-pointer">
            <Image size={22} className="mr-2"/>
            <span className="hidden mobile:inline-block text-gray-500 font-semibold ">
                Photo/Video
            </span>
          </div>
          <div className="pr-6 text-warning flex items-center cursor-pointer">
            <Camera size={22} className="mr-2"/>
            <span className="hidden mobile:inline-block text-gray-500 font-semibold ">
                Feeling/Activity
            </span>
          </div>
        </div>
        {/* Right */}
        <div className="flex justify-end items-center">
          <div className="w-[45px] h-[45px] rounded-[45px] flex justify-center items-center bg-background cursor-pointer">
            <MoreHorizontal size={23} />
          </div>
        </div>
      </div>
    </div>
  );
}
