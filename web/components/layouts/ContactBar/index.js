import { useEffect, useState } from "react";
import StatusDot from "./StatusDot";
import axios from "~/api/axios";
import { Skeleton } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import SkeletonInput from "antd/lib/skeleton/Input";
import Result from "antd";
import { v4 as uuidv4 } from "uuid";
import Chat from "~/components/chat/Chat";
const ContactBar = () => {
  const [loading, setLoading] = useState(true);
  const [listFriends, setListFriends] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [targetData, setTargetData] = useState({});
  useEffect(() => {
    const fetchListFriends = async () => {
      setLoading(true);
      const res = await axios.get("/friends");
      //console.log("friends", res.data);
      setListFriends(res.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };
    fetchListFriends();
  }, []);

  const handleShowChatBox = (data) => {
    setShowChatBox(false);
    setTimeout(() => {
      setShowChatBox(true);
      setTargetData(data);
    }, 100);
  };

  const handleCloseChatBox = () => {
    setShowChatBox(false);
  };

  return (
    <>
      {showChatBox && (
        <Chat targetData={targetData} handleCloseChatBox={handleCloseChatBox} />
      )}
      <div className="flex flex-col mt-2 bg-white rounded-[15px] shadow-[0_8px_30px_8px_rgba(0,0,0,0.05)] relative">
        {/* Boxchat */}

        {/* Contacts */}
        <div className="flex flex-col pl-6 pr-4 pt-6 ">
          <span className="font-semibold text-gray-text block text-[0.625rem] tracking-[1px] mb-2">
            Contacts
          </span>
          <>
            {loading ? (
              <>
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <div
                      className="py-2 flex items-center justify-between"
                      key={uuidv4()}
                    >
                      <div className="flex items-center justify-between">
                        <SkeletonAvatar size={35} shape="circle" active />
                        <SkeletonInput
                          size="small"
                          style={{ width: 100, marginLeft: "10px" }}
                          active
                        />
                      </div>
                      <StatusDot color={"online"} />
                    </div>
                  );
                })}
              </>
            ) : (
              listFriends.map((friend, index) => {
                return (
                  <div
                    className="py-2 flex items-center justify-between"
                    key={uuidv4()}
                    onClick={() => handleShowChatBox(friend)}
                  >
                    <div className="flex">
                      <img
                        src={friend.avatar}
                        alt="user"
                        className="w-[35px] h-[35px] rounded-[35px] mr-2"
                      />
                      <span className="leading-[35px] text-xs text-[#6C757D] font-bold">
                        {friend.name}
                      </span>
                    </div>
                    <StatusDot color={"online"} />
                  </div>
                );
              })
            )}
          </>
        </div>
        {/* Groups */}
        <div className="flex flex-col pl-6 pr-4 pt-6 ">
          <span className="font-semibold text-gray-text block text-[0.625rem] tracking-[1px] mb-2">
            Groups
          </span>
          {/* Groups block */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <img
                src="http://sociala.uitheme.net/assets/images/user-8.png"
                alt="user"
                className="w-[35px] h-[35px] rounded-[35px] mr-2"
              />
              <span className="leading-[35px] text-xs text-[#6C757D] font-bold">
                Hurin Seary
              </span>
            </div>
            <StatusDot color={"busy"} />
          </div>
          {/* Groups block */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <img
                src="http://sociala.uitheme.net/assets/images/user-8.png"
                alt="user"
                className="w-[35px] h-[35px] rounded-[35px] mr-2"
              />
              <span className="leading-[35px] text-xs text-[#6C757D] font-bold">
                Hurin Seary
              </span>
            </div>
            <StatusDot color={"busy"} />
          </div>
          {/* Groups block */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <img
                src="http://sociala.uitheme.net/assets/images/user-8.png"
                alt="user"
                className="w-[35px] h-[35px] rounded-[35px] mr-2"
              />
              <span className="leading-[35px] text-xs text-[#6C757D] font-bold">
                Hurin Seary
              </span>
            </div>
            <StatusDot color={"busy"} />
          </div>
        </div>
        {/* Pages */}
        <div className="flex flex-col pl-6 pr-4 pt-6 ">
          <span className="font-semibold text-gray-text block text-[0.625rem] tracking-[1px] mb-2">
            Pages
          </span>
          {/* Groups block */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <img
                src="http://sociala.uitheme.net/assets/images/user-8.png"
                alt="user"
                className="w-[35px] h-[35px] rounded-[35px] mr-2"
              />
              <span className="leading-[35px] text-xs text-[#6C757D] font-bold">
                Hurin Seary
              </span>
            </div>
            <StatusDot color={"busy"} />
          </div>
          {/* Groups block */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <img
                src="http://sociala.uitheme.net/assets/images/user-8.png"
                alt="user"
                className="w-[35px] h-[35px] rounded-[35px] mr-2"
              />
              <span className="leading-[35px] text-xs text-[#6C757D] font-bold">
                Hurin Seary
              </span>
            </div>
            <StatusDot color={"busy"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactBar;
