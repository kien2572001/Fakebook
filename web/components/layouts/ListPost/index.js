import react from "react";

import PostCard from "./PostCard";
import CreatePostCard from "./CreatePostCard";

export default function ListPost() {
  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
        <CreatePostCard />
        <PostCard />
    </div>
  );
}
