import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "~/api/axios";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
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
      //console.log(res.data.data);
    };
    fetchPosts();
  }, []);

  const handleAddPost = (post) => {
    setItems([post, ...items]);
  };

  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
      <CreatePostCard userData={userData} handleAddPost={handleAddPost} />
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
      {items.map((item) => (
        <PostCard key={uuidv4()} item={item} />
      ))}
    </div>
  );
}
