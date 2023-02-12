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

export default function FriendCardProfile({ friend ,thisProfileUser}) {
  const user = thisProfileUser;
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
        <div className="flex items-center justify-center">
          {type === "accepted" && <div>Friends</div>}
        </div>,
      ]}
    >
      <Meta
        title={<Link href={`/profile/${friend.id}`}>{friend.name}</Link>}
        description="This is the description"
      />
    </Card>
  );
}
