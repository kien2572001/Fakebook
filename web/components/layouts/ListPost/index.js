import react from "react";

import PostCard from "./PostCard";
import CreatePostCard from "./CreatePostCard";
import axios from "~/api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "~/store/userSlice";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ListPost({ userData }) {
  //const [items, setItems] = useState(Array.from({ length: 5 }));
  const [items, setItems] = useState([]);
  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 5 })));
    }, 1500);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/list", {
        params: {
          user_id: userData.id,
        },
      });
      setItems(res.data.data);
      console.log(res.data);
    };
    fetchPosts();
    //console.log("user", userData);
  }, []);

  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
      <CreatePostCard userData={userData} />
      {/* <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <PostCard key={index} />
        ))}
      </InfiniteScroll> */}
      {items.map((item, index) => (
        <PostCard key={index} item={item} />
      ))}
    </div>
  );
}
