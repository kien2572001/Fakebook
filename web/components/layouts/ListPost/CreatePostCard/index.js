import react from "react";
import styles from "~/styles/Main.module.css";
import {
  Edit3,
  Video,
  Image,
  Camera,
  MoreHorizontal,
  Smile,
  User,
  MapPin,
  Flag,
} from "react-feather";
import { Button, Modal, Select, Tooltip } from "antd";
import { useState, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Input } from "antd";
const { TextArea } = Input;
import UploadImagePost from "./UploadImagePost";
import axios from "~/api/axios";

export default function CreatePostCard({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postMessage, setPostMessage] = useState("");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [postStatus, setPostStatus] = useState("Public");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    //reset postMessage
    setPostMessage("");
    setShowIconPicker(false);
  };

  const handlePostStatus = (value) => {
    setPostStatus(value);
  };

  const textRef = useRef();

  const onChangeSize = (e) => {
    const target = e.target;
    textRef.current.style.height = "150px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  const handleSubmitPost = async () => {
    let data = new FormData();
    data.append("content", postMessage);
    data.append("status", "Public");
    let i = 0;
    fileList.forEach((item) => {
      data.append("media_" + i, item.originFileObj);
      i++;
    });
    data.append("media_length", fileList.length);
    const res = await axios.post("/posts/create", data);
    if (res.status === 200) {
      clearModal();
      alert("Post successfully!");
    } else {
      alert("Something went wrong!");
    }
  };

  const clearModal = () => {
    setPostMessage("");
    handleCancel();
    setFileList([]);
  };

  return (
    <>
      <Modal
        title="Create new post"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        className="create-post-modal"
        footer={
          <div className="flex justify-between items-center ">
            <Button
              onClick={handleSubmitPost}
              className="w-full h-[36px] bg-[#1B74E4] text-white font-semibold rounded-[6px]"
            >
              Post
            </Button>
          </div>
        }
      >
        <div className="flex flex-col p-0">
          {/* Avatar block */}
          <div className="flex items-center p-4">
            <div>
              <img
                src={
                  userData?.avatar
                    ? userData.avatar
                    : "http://sociala.uitheme.net/assets/images/profile-4.png"
                }
                alt="avatar"
                className="w-[40px] h-[40px] rounded-[30px] mr-4"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold">John Doe</span>
              <span className="text-gray-500 font-semibold opacity-40">
                <Select
                  defaultValue="Public"
                  onChange={handlePostStatus}
                  className=""
                  size="small"
                  options={[
                    { label: "Public", value: "Public" },
                    { label: "Friends", value: "Friends" },
                    { label: "Only me", value: "Only me" },
                  ]}
                ></Select>
              </span>
            </div>
          </div>
          {/* End avatar block */}
          {/* Text input block */}
          <textarea
            ref={textRef}
            className={`${
              postMessage === "What's on your mind ?"
                ? "text-gray-text"
                : "text-black"
            } w-full outline-none  text-2xl block z-50 break-all mb-2 relative px-4 min-h-[150px] resize-none	overflow-hidden`}
            value={postMessage}
            onChange={(e) => {
              console.log(e.target.value);
              setPostMessage(e.target.value);
              onChangeSize(e);
            }}
            placeholder="What's on your mind ?"
          ></textarea>
          <div className="px-4">
            <UploadImagePost fileList={fileList} setFileList={setFileList} />
          </div>
          {/* End text input block */}
          {/* Image, Video, Camera block */}
          <div className="relative flex justify-between items-center m-4 px-2 rounded-[8px] border-solid border border-[#CED0D4] leading-[58px]">
            <div className="absolute top-[-50px] right-[-10px] z-50  ">
              <div className="w-[40px] h-[40px] rounded-[40px] hover:bg-slate-100 flex justify-center items-center">
                <Smile
                  size={30}
                  className=" cursor-pointer"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                />
              </div>
            </div>
            {showIconPicker && (
              <div className="absolute bottom-0 right-[-78%] z-50">
                <Picker
                  data={data}
                  onEmojiSelect={(e) => {
                    if (postMessage === "What's on your mind ?") {
                      setPostMessage(e.native);
                    } else {
                      setPostMessage(postMessage + e.native);
                    }
                    console.log(e);
                  }}
                />
              </div>
            )}
            <div className="text-sm font-semibold text-[#050505] pl-2 leading-[58px] grow">
              Add to your post
            </div>
            <div className="flex justify-between grow">
              <Tooltip title="Photo/video">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[40px] hover:bg-gray-100">
                  <Image
                    size={30}
                    className=" cursor-pointer"
                    color="#00A400"
                  />
                </div>
              </Tooltip>
              <Tooltip title="Tag friends">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[40px] hover:bg-gray-100">
                  <User size={30} className=" cursor-pointer" color="#3578E5" />
                </div>
              </Tooltip>
              <Tooltip title="Feeling/Activity">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[40px] hover:bg-gray-100">
                  <Smile
                    size={30}
                    className=" cursor-pointer"
                    color="#F5C338"
                  />
                </div>
              </Tooltip>
              <Tooltip title="Check in">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[40px] hover:bg-gray-100">
                  <MapPin
                    size={30}
                    className=" cursor-pointer"
                    color="#FA383E"
                  />
                </div>
              </Tooltip>
              <Tooltip title="Life event">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[40px] hover:bg-gray-100">
                  <Flag size={30} className=" cursor-pointer" color="#1877F2" />
                </div>
              </Tooltip>
            </div>
          </div>

          {/* End image, video, camera block */}
        </div>
      </Modal>

      <div className={styles.card}>
        {/* Create post button */}
        <div className="flex justify-start items-center text-xs	">
          <div className="text-primary w-[35px] h-[35px] rounded-[35px] bg-background flex items-center justify-center mr-2 ">
            <Edit3 size={18} />
          </div>
          <span className="text-gray-500 font-bold opacity-40">
            Create Post
          </span>
        </div>
        {/* Textarea box */}
        <div className="relative mt-4 ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              userData?.avatar
                ? userData.avatar
                : "http://sociala.uitheme.net/assets/images/profile-4.png"
            }
            alt="avatar"
            className="w-[30px] h-[30px] rounded-[30px] ml-1 mt-1 absolute"
            onClick={showModal}
          />
          <div className={styles.createPostTextarea} onClick={showModal}>
            <span className="text-gray-500 font-semibold opacity-40">
              What's on your mind ?
            </span>
          </div>
        </div>
        {/* Video, Image, Camera button */}
        <div className="flex justify-between items-center mt-2 text-xs ">
          {/* Left */}
          <div className="flex justify-start items-center">
            <div className="pr-6 text-danger flex items-center cursor-pointer">
              <Video size={22} className="mr-2" />
              <span className="hidden mobile:inline-block text-gray-500 font-semibold ">
                Live Video
              </span>
            </div>
            <div className="pr-6 text-success flex items-center cursor-pointer">
              <Image size={22} className="mr-2" />
              <span className="hidden mobile:inline-block text-gray-500 font-semibold ">
                Photo/Video
              </span>
            </div>
            <div className="pr-6 text-warning flex items-center cursor-pointer">
              <Camera size={22} className="mr-2" />
              <span className="hidden mobile:inline-block text-gray-500 font-semibold ">
                Feeling/Activity
              </span>
            </div>
          </div>
          {/* Right */}
          <div className="flex justify-end items-center">
            <div className="w-[45px] h-[45px] rounded-[45px] flex justify-center items-center bg-background cursor-pointer">
              <MoreHorizontal size={23} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
