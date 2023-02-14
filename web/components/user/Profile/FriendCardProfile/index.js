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

export default function FriendCardProfile({ friend, thisProfileUser }) {
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
          <Image alt="example" src={friend.avatar} width={300} height={300} />
        </Link>
      }
      actions={[
        <div className="flex items-center justify-center">
          {type === "accepted" && <div>Friends</div>}
        </div>,
      ]}
    >
      <Meta
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={<Link href={`/profile/${friend.id}`}>{friend.name}</Link>}
        description={
          <div className="flex items-center justify-start">
            <Avatar.Group maxCount={5} size="small">
              {friend.mutual_friends.map((friend) => {
                return <Avatar src={friend.avatar} />;
              })}
              {friend.mutual_friends.length === 0 && (
                <div className="text-gray-500 leading-[24px]">
                  No mutual friends
                </div>
              )}
            </Avatar.Group>
          </div>
        }
      />
    </Card>
  );
}
