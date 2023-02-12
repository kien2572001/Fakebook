import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "~/api/axios";
import { Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Image, Empty } from "antd";
import FriendCardProfile from "../FriendCardProfile";
export default function Friends({ thisProfileUser }) {
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const fetchFriends = async () => {
    const res = await axios.get(`/friends/all-friends`, {
      params: {
        page: page,
        user_id: thisProfileUser.id,
        status: "accepted",
      },
    });
    if (res.status === 200) {
      let data = res.data.data.data;
      if (typeof data === "object") {
        data = Object.values(data);
      }
      setFriends([...friends, ...data]);
      setLastPage(res.data.data.last_page);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="max-tablet:flex-col flex flex-row mt-4 w-full">
      <div className="p-4 rounded-xl bg-white shadow-md mb-4 w-full">
        <div className="px-4">
          <p className="font-bold text-lg mb-4">Friends</p>
        </div>
        {/* photos grid */}
        <InfiniteScroll
          dataLength={friends?.length}
          next={fetchFriends}
          hasMore={page <= lastPage}
          loader={
            <div className="flex justify-center items-center mt-4">
              <Spin />
            </div>
          }
        >
          <div className="grid grid-cols-4 gap-4">
            {friends.map((friend) => {
              return (
                <FriendCardProfile
                  friend={friend}
                  key={uuidv4()}
                  thisProfileUser={thisProfileUser}
                />
              );
            })}
          </div>
          {friends.length === 0 && (
            <div className="flex justify-center items-center w-full h-full mt-2">
              <Empty description="No friends" />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
