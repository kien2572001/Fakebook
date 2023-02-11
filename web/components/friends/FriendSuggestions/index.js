import { Filter, Search, Users } from "react-feather";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios from "~/api/axios";
import { v4 as uuidv4 } from "uuid";
import FriendCard from "../AllFriends/FriendCard";
import { message, Badge, Dropdown, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import FriendRequestBox from "../FriendRequestBox";
import { useRouter } from "next/router";

export default function FriendSuggestions(userData) {
  const [listFriends, setListFriends] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [listRequest, setListRequest] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [showListRequest, setShowListRequest] = useState(false);
  const router = useRouter();

  const fetchFriends = async () => {
    const res = await axios.get("/friends/suggestions", {
      params: {
        page: pageParam,
      },
    });
    if (res.status === 200) {
      setListFriends([...listFriends, ...res.data.data.data]);
      setLastPage(res.data.data.last_page)
      setPageParam(pageParam + 1);
    }
  };

  const getListFriendRequest = async () => {
    const res = await axios.get("/friends/request");
    console.log("request", res.data.data);
    if (res.status === 200) {
      setListRequest(res.data.data);
      setRequestCount(res.data.data.length);
    }
  };

  useEffect(() => {
    fetchFriends();
    getListFriendRequest();
  }, []);


  const handleAcceptFriendRequest = async (id) => {
    const res = await axios.post("/friends/accept", {
      user_id: id,
    });

    if (res.status === 200) {
      setListRequest(listRequest.filter((item) => item.source_id !== id));
      setRequestCount(requestCount - 1);
      message.success("Accept friend request successfully");
    } else {
      message.error("Accept friend request failed");
    }
  };
  const handleRejectFriendRequest = async (id) => {
    const res = await axios.post("/friends/reject", {
      user_id: id,
    });

    if (res.status === 200) {
      setListRequest(listRequest.filter((item) => item.source_id !== id));
      setRequestCount(requestCount - 1);
      message.success("Reject friend request successfully");
    } else {
      message.error("Reject friend request failed");
    }
  };

  return (
    <div className="mx-32 w-4/5 mt-4">
      <div className="w-full p-6 flex justify-between h-[90px] bg-white items-center rounded-md">
        <div className="flex items-center">
          <Link href="/friends">
            <span
              className={
                router.pathname === "/friends"
                  ? "text-xl font-bold ml-2"
                  : "text-xl font-bold ml-2 text-gray-400"
              }
            >
              Friends
            </span>
          </Link>
          <span className="text-gray-400 ml-2">/</span>
          <Link href="/friends/friend-suggestions">
            <span
              className={
                router.pathname === "/friends/friend-suggestions"
                  ? "text-xl font-bold ml-2"
                  : "text-xl font-bold ml-2 text-gray-400"
              }
            >
              Friend Suggestions
            </span>
          </Link>
        </div>
        <div className="flex h-full">
          <div className="flex bg-gray-100 text-gray-400 justify-center items-center rounded-md relative mr-2">
            <input
              type="text"
              placeholder="Search here."
              className="outline-none px-4 py-2 bg-gray-100 rounded text-sm pr-8"
            />
            <Search width={20} className="absolute right-2" />
          </div>
          <div className="flex justify-center items-center bg-gray-100 h-full py-2 px-3 rounded">
            <Filter width={20} className="text-gray-400" />
          </div>
          <Badge count={requestCount} overflowCount={99}>
            <div
              className="flex justify-center items-center bg-gray-100 h-full py-2 px-3 rounded ml-2 relative"
              onClick={() => {
                if (listRequest.length > 0) {
                  setShowListRequest(!showListRequest);
                }
              }}
            >
              <Users width={20} className="text-gray-400" />
              {showListRequest && listRequest.length > 0 && (
                <FriendRequestBox
                  data={listRequest}
                  handleAcceptFriendRequest={handleAcceptFriendRequest}
                  handleRejectFriendRequest={handleRejectFriendRequest}
                />
              )}
            </div>
          </Badge>
        </div>
      </div>

      <InfiniteScroll
        dataLength={listFriends.length}
        next={fetchFriends}
        hasMore={pageParam <= lastPage}
        loader={
          <div className="flex justify-center items-center mt-4">
            <Spin />
          </div>
        }
      >
        <div className="grid grid-cols-4 gap-x-4 gap-y-3 mt-4">
          {listFriends.map((item, index) => {
            return <FriendCard key={uuidv4()} friend={item} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
