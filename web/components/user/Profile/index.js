import { useContext, useEffect, useState } from "react";
import { parserUserCookies } from "~/ultis/parser";
import {
  ExternalLink,
  Eye,
  Lock,
  Mail,
  MapPin,
  MoreHorizontal,
  Users,
} from "react-feather";
import MainLayout from "~/components/layouts/MainLayout";
import AuthContext from "~/contexts/AuthContext";
import ListPost from "~/components/layouts/ListPost";
import axios from "~/api/axios";
import { Button, Dropdown, Menu, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Image } from "antd";
import About from "./About";
import Photos from "./Photos";

export default function Profile({ userData, thisProfileUser }) {
  const [checkRelation, setCheckRelation] = useState("none");
  const [source_id, setSource_id] = useState(userData.id);
  const [target_id, setTarget_id] = useState(thisProfileUser.id);
  const [tab, setTab] = useState("photos");

  const friendSelectItems = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => handleCancelFriend()}>Cancel friend</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div> Block</div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const checkFriend = async () => {
      try {
        const response = await axios.get(
          "/friends/check/" + thisProfileUser.id
        );
        console.log("response", response.data.data);
        if (response.status === 200) {
          setCheckRelation(response.data.data?.status);
        }
        setSource_id(response.data.data?.source_id);
        setTarget_id(response.data.data?.target_id);
      } catch (error) {
        console.log(error);
      }
    };
    if (userData.id !== thisProfileUser.id) {
      checkFriend();
    } else {
      setCheckRelation("myself");
    }
  }, []);

  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/friends/add/", {
        target_id: thisProfileUser.id,
      });
      if (response.status === 200) {
        setCheckRelation(response.data.data?.status);
        message.success("Send friend request successfully");
      } else {
        message.error("Send friend request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectFriend = async () => {
    try {
      const response = await axios.post("/friends/reject/", {
        user_id: source_id,
      });
      if (response.status === 200) {
        setCheckRelation(response.data.data?.status);
        message.success("Reject friend successfully");
      } else {
        message.error("Reject friend failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriend = async () => {
    try {
      const response = await axios.post("/friends/accept/", {
        user_id: source_id,
      });
      if (response.status === 200) {
        setCheckRelation(response.data.data?.status);
        message.success("Accept friend successfully");
      } else {
        message.error("Accept friend failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelFriend = async () => {
    try {
      const response = await axios.post("/friends/delete/", {
        user_id: thisProfileUser.id,
      });
      if (response.status === 200) {
        setCheckRelation("none");
        message.success("Cancel friend successfully");
      } else {
        message.error("Cancel friend failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderFriendButton = () => {
    if (checkRelation === "myself") {
      return;
    } else if (checkRelation === "none" || checkRelation === "reject") {
      return (
        <button
          className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
          onClick={() => handleAddFriend()}
        >
          Add friend
        </button>
      );
    } else if (checkRelation === "pending") {
      if (source_id === userData.id) {
        return (
          <button
            className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
            onClick={() => handleAddFriend()}
          >
            Cancel request
          </button>
        );
      } else {
        return (
          <>
            <button
              className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
              onClick={() => handleAcceptFriend()}
            >
              Accept request
            </button>
            <button
              className="bg-danger text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
              onClick={() => handleRejectFriend()}
            >
              Reject request
            </button>
          </>
        );
      }
    } else if (checkRelation === "accepted") {
      return (
        <Dropdown overlay={friendSelectItems}>
          <button className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2">
            Friend
          </button>
        </Dropdown>
      );
    }
  };

  return (
    <div className="mini-desktop:mx-32">
      {/* Profile Header */}
      <div className="py-4 my-2 h-[360px] tablet:h-[400px] mini-desktop:h-[436px] rounded-2xl bg-white relative drop-shadow-md">
        <div className="rounded-2xl overflow-hidden px-4 h-3/5 ">
          <img
            src="http://sociala.uitheme.net/assets/images/u-bg.jpg"
            alt="image-background"
            className="w-full h-full object-fit rounded-2xl"
          />
        </div>

        <div className="flex relative px-4">
          <div className="absolute -top-[30px] left-8 w-[108px] h-[108px] rounded-full bg-white flex justify-center items-center">
            <img
              src={
                thisProfileUser?.avatar ||
                "http://sociala.uitheme.net/assets/images/user-12.png"
              }
              alt="image-profile"
              className="w-[100px] h-[100px] rounded-full object-cover "
            />
          </div>
          <div className=" ml-36 mt-4 flex w-full justify-between">
            <div>
              <p className="font-bold text-xl">
                {thisProfileUser?.firstName + " " + thisProfileUser?.lastName ||
                  "Người dùng facebook"}
              </p>
              <p className="text-sm text-gray-400 font-medium">
                {thisProfileUser?.email}
              </p>
            </div>
            <div className="flex items-center max-tablet:hidden">
              {renderFriendButton()}
              <div className=" bg-[#f5f5f5] w-[50px] h-[50px] flex justify-center items-center mr-2 rounded-md">
                <Mail width={25} className="text-gray-600" />
              </div>
              <div className=" bg-[#f5f5f5] w-[50px] h-[50px] flex justify-center items-center mr-2 rounded-md">
                <MoreHorizontal width={25} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-14 border-t-[1px] flex items-center">
          <div className=" flex items-center w-full justify-around">
            <span
              className="text-sm cursor-pointer font-semibold  
            after:content-[''] after:absolute after:bottom-0 after:left-6 after:h-[2px] after:bg-black"
            >
              About
            </span>
            <span className="text-sm cursor-pointer font-semibold  text-gray-400">
              Photos
            </span>
            <span className="text-sm cursor-pointer font-semibold  text-gray-400">
              Discussion
            </span>
            <span className="text-sm cursor-pointer font-semibold  text-gray-400">
              Video
            </span>
            <span className="text-sm cursor-pointer font-semibold  text-gray-400">
              Group
            </span>
            <span className="max-mobile:hidden text-sm cursor-pointer font-semibold  text-gray-400">
              Events
            </span>
            {/* <span className="max-mobile:hidden text-sm cursor-pointer font-semibold  text-gray-400">
              Media
            </span> */}
          </div>
        </div>
      </div>
      {/* Profile body */}
      {tab === "about" ? (
        <About thisProfileUser={thisProfileUser} />
      ) : tab === "photos" ? (
        <Photos />
      ) : (
        <></>
      )}
    </div>
  );
}
