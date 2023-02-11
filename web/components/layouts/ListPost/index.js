import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "~/api/axios";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
export default function ListPost({ userData, location = "newsfeed" }) {
  const [items, setItems] = useState([]);
  const apiUrl = new Map([
    ["newsfeed", "/posts/newsfeed"],
    ["profile", "/posts/profile"],
  ]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const fetchPosts = async () => {
    const res = await axios.get(apiUrl.get(location), {
      params: {
        user_id: userData.id,
        page: page,
      },
    });

    if (res.status === 200) {
      let data = res.data.data.data;
      if (typeof data === "object"){
        data = Object.values(data);
      }

      setItems([...items, ...data]);
      setPage(page + 1);
      setLastPage(res.data.data.last_page);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = (post) => {
    setItems([post, ...items]);
  };

  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
      <CreatePostCard userData={userData} handleAddPost={handleAddPost} />
      <InfiniteScroll
        dataLength={items?.length}
        next={fetchPosts}
        hasMore={page <= lastPage}
        loader={
          <div className="flex justify-center items-center mt-4">
            <Spin />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items?.map((item) => (
          <PostCard key={uuidv4()} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
