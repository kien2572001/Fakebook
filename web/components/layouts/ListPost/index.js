import react from "react";

import PostCard from "./PostCard";
import CreatePostCard from "./CreatePostCard";
import axios from "~/api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "~/store/userSlice";

export default function ListPost() {
  const userData = useSelector(selectUser);

  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
      <CreatePostCard userData={userData} />
      <PostCard />
    </div>
  );
}
