import React from "react";
import Like from "~/public/reactions/facebook-like.svg";
import Love from "~/public/reactions/facebook-love.svg";
import Haha from "~/public/reactions/facebook-haha.svg";
import Wow from "~/public/reactions/facebook-wow.svg";
import Sad from "~/public/reactions/facebook-sad.svg";
import Angry from "~/public/reactions/facebook-angry.svg";
import Image from "next/image";
export default function Reactions(){
    return (
        <div className="flex justify-between items-center w-[200px] laptop:w-[250px]">
            <Image src = {Like} width = {25} height = {25} />
            <Image src = {Love} width = {25} height = {25} />
            <Image src = {Haha} width = {25} height = {25} />
            <Image src = {Wow} width = {25} height = {25} />
            <Image src = {Sad} width = {25} height = {25} />
            <Image src = {Angry} width = {25} height = {25} />
        </div>
    )
}