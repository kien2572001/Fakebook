import React from "react";
import moment from "moment";
export default function Comment({ comment }) {
  return (
    <div className="flex pt-1">
      {/* Avatar */}
      <div className="flex justify-center items-top grow-0 mr-2">
        <img
          src={comment.user.avatar}
          alt="avatar"
          className="min-w-[32px] h-[32px] rounded-[32px]"
        />
      </div>
      {/* Content */}
      <div className="grow text-sm text-[#050505]">
        <div className="inline-block bg-[#F0F2F5] rounded-[18px] px-3 py-2">
          <div className="flex items-start flex-col ">
            <span className=" font-semibold">
              {comment.user.first_name + " " + comment.user.last_name}
            </span>
            <div className="">
              <span className="">{comment.content}</span>
            </div>
          </div>
        </div>
        {/* Like response */}
        <div className="flex items-center font-semibold ml-1 mt-1 cursor-default">
          <span className=" text-xs px-2 hover:underline selet">Like</span>
          <span className=" text-xs px-2 hover:underline">Reply</span>
          <span className=" text-xs px-2 font-normal text-[#65676B]">{
            moment(comment.created_at).fromNow()
          }</span>
        </div>
      </div>
    </div>
  );
}
