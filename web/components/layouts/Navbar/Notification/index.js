import { v4 as uuidv4 } from "uuid";
import { Result, Empty, Modal } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "~/api/axios";
export default function Notification({ data }) {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const router = useRouter();

  const showConfirm = (item) => {
    Modal.confirm({
      title: "Do you want to accept this group invite?",
      onOk() {
        handleAcceptGroupInvite(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleAcceptGroupInvite = async (item) => {
    const res = await axios.post("/groups/accept-invite", {
      group_id: item.notification.notificationable_id,
      user_id: user.id,
    });
    if (res.status === 200) {
      message.success("You have joined this group");
      router.push(`/groups/${item.notification.notificationable_id}`);
    }
  };

  const handleRejectGroupInvite = async (item) => {
    const res = await axios.post("/groups/reject-invite", {
      group_id: item.notification.notificationable_id,
      user_id: user.id,
    });
    if (res.status === 200) {
      message.success("You have rejected this group invite");
    }
  };

  const handleClick = (item) => {
    if (item.notification.type === "friend_request") {
      router.push("/friends");
    } else if (
      item.notification.type === "reaction" ||
      item.notification.type === "comment"
    ) {
      router.push(`/posts/${item.notification.notificationable_id}`);
    } else if (item.notification.type === "group_invite") {
      showConfirm(item);
    }
  };

  return (
    <div className="flex justify-center h-screen absolute right-4">
      <div className="relative my-[90px]">
        <div
          className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
          style={{ width: "20rem" }}
        >
          <div
            className={`py-2 max-h-[341px] ${
              data && data.length > 0
                ? "overflow-x-hidden overflow-y-auto"
                : "overflow-hidden"
            } cursor-pointer`}
          >
            {data && data.length === 0 && (
              <Empty
                description={
                  <span className="text-gray-600 text-sm">No notification</span>
                }
              />
            )}
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    onClick={() => handleClick(item)}
                    className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                    key={uuidv4()}
                  >
                    <img
                      className="h-8 min-w-8 rounded-full object-cover mx-1"
                      src={item.notification?.user_src.avatar}
                      alt="avatar"
                    />
                    <p className="text-gray-600 text-sm mx-2">
                      <span className="font-bold" href="#">
                        {item.notification.user_src.name}
                      </span>{" "}
                      {item.notification.signal}{" "}
                      {/* <span className="font-bold text-blue-500" href="#">
                        Upload Image
                      </span>{" "} */}
                      {/* artical . 2m */}
                      {moment(item.notification.created_at).fromNow()}
                    </p>
                  </div>
                );
              })}
          </div>
          <div
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            See all notifications
          </div>
        </div>
      </div>
    </div>
  );
}
