import React from "react";
import { useState, useEffect } from "react";
import { Popover } from "antd";
import Image from "next/image";
import Angry from "~/public/reactions/facebook-angry.svg";
import Haha from "~/public/reactions/facebook-haha.svg";
import Like from "~/public/reactions/facebook-like.svg";
import Love from "~/public/reactions/facebook-love.svg";
import Sad from "~/public/reactions/facebook-sad.svg";
import Wow from "~/public/reactions/facebook-wow.svg";

export default function ReactionBar({ handleReactions, children}) {
  return (
    <Popover
      content={
        <div className="flex justify-between items-center w-[200px] laptop:w-[250px]">
          <div onClick={() => handleReactions("like")}>
            <Image src={Like} width={25} height={25} alt="like" />
          </div>
          <div onClick={() => handleReactions("love")}>
            <Image src={Love} width={25} height={25} alt="love" />
          </div>
          <div onClick={() => handleReactions("haha")}>
            <Image src={Haha} width={25} height={25} alt="haha" />
          </div>
          <div onClick={() => handleReactions("wow")}>
            <Image src={Wow} width={25} height={25} alt="wow" />
          </div>
          <div onClick={() => handleReactions("sad")}>
            <Image src={Sad} width={25} height={25} alt="sad" />
          </div>
          <div onClick={() => handleReactions("angry")}>
            <Image src={Angry} width={25} height={25} alt="angry" />
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
}
