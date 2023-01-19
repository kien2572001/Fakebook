import react from "react";

import PostCard from "./PostCard";
import CreatePostCard from "./CreatePostCard";
import axios from "~/api/axios";
import { useEffect, useState } from "react";

export default function ListPost() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get("/users/my-information");
      console.log(res);
      setUserData(res.data.data);
    };
    getUserData();
  }, []);

  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
      <CreatePostCard userData={userData} />
      <PostCard />
    </div>
  );
}
