import react from "react";

import PostCard from "./PostCard";
import CreatePostCard from "./CreatePostCard";

export default function ListPost() {
  return (
    <div className="px-[15px]">
        <CreatePostCard />
        <PostCard />
    </div>
  );
}
