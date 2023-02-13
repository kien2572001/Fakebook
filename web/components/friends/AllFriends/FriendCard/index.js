import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, message } from "antd";
const { Meta } = Card;
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "~/api/axios";
import Image from "next/image";

export default function FriendCard({ friend }) {
  const user = useSelector((state) => state.user.user);
  const [type, setType] = useState(
    friend?.status === "accepted"
      ? "accepted"
      : friend.status === "pending"
      ? "pending"
      : "none"
  );

  useEffect(() => {
    console.log("friend", friend);
  }, []);

  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/friends/add/", {
        target_id: friend.id,
      });
      if (response.status === 200) {
        setType("pending");
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
      const response = await axios.post("/friends/delete/", {
        user_id: friend.id,
      });
      if (response.status === 200) {
        setType("none");
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
        }
      }
      cover={
        <Link href={`/profile/${friend.id}`}>
          <Image alt="example" src={friend.avatar}
            width={300}
            height={300}
          />
        </Link>
      }
      actions={[
        <div className="flex items-center justify-center">
          {type === "none" && <div onClick={handleAddFriend}>Add Friend</div>}
          {type === "pending" && (
            <div onClick={handleCancelFriendRequest}>Cancel Request</div>
          )}
          {type === "accepted" && <div>Friends</div>}
        </div>,
      ]}
    >
      <Meta
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={<Link href={`/profile/${friend.id}`}>{friend.name}</Link>}
        description="This is the description"
      />
    </Card>
  );
}
