import React from "react";
import Like from "~/public/reactions/facebook-like.svg";
import Love from "~/public/reactions/facebook-love.svg";
import Haha from "~/public/reactions/facebook-haha.svg";
import Wow from "~/public/reactions/facebook-wow.svg";
import Sad from "~/public/reactions/facebook-sad.svg";
import Angry from "~/public/reactions/facebook-angry.svg";
import Image from "next/image";
export default function LikeButton({ reactions, size = 25 }) {
  return reactions === "like" ? (
    <Image src={Like} width={size} height={size} alt="like" />
  ) : reactions === "love" ? (
    <Image src={Love} width={size} height={size} alt="love" />
  ) : reactions === "haha" ? (
    <Image src={Haha} width={size} height={size} alt="haha" />
  ) : reactions === "wow" ? (
    <Image src={Wow} width={size} height={size} alt="wow" />
  ) : reactions === "sad" ? (
    <Image src={Sad} width={size} height={size} alt="sad" />
  ) : reactions === "angry" ? (
    <Image src={Angry} width={size} height={size} alt="angry" />
  ) : (
    <Image src={Like} width={size} height={size} alt="like" />
  );
}
