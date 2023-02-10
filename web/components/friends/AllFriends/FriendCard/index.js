import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "~/api/axios";

export default function FriendCard({ friend }) {
  const user = useSelector((state) => state.user.user);
  const [type, setType] = useState("none");

  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/friends/add/", {
        target_id: friend.id,
      });
      if (response.status === 200) {
        setType("sending-request");
        message.success("Send friend request successfully");
      } else {
        message.error("Send friend request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      const response = await axios.post("/friends/cancel/", {
        target_id: friend.id,
      });
      if (response.status === 200) {
        setCheckRelation("none");
        message.success("Cancel friend request successfully");
      } else {
        message.error("Cancel friend request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      style={
        {
          //width: 300,
          //height: 300,
        }
      }
      cover={
        <Link href={`/profile/${friend.id}`}>
          <img alt="example" src={friend.avatar} />
        </Link>
      }
      actions={[
        // <SettingOutlined key="setting" />,
        // <EditOutlined key="edit" />,
        // <EllipsisOutlined key="ellipsis" />,
        <div className="flex items-center justify-center">
          {type === "none" && <div onClick={handleAddFriend}>Add Friend</div>}
          {type === "sending-request" && (
            <div onClick={handleCancelFriendRequest}>Cancel Request</div>
          )}
        </div>,
      ]}
    >
      <Meta
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={
          <Link href={`/profile/${friend.id}`}>
            {friend.first_name + " " + friend.last_name}
          </Link>
        }
        description="This is the description"
      />
    </Card>
  );
}
