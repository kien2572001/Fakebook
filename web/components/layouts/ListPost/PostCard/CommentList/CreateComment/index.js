import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smile, Camera, X, Send } from "react-feather";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "~/api/axios";

export default function CreateComment({
  postId,
  addComment,
  type = "comment",
}) {
  const user = useSelector((state) => state.user.user);
  const [content, setContent] = useState("");
  const textRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [openSelectImage, setOpenSelectImage] = useState(false);

  const onChangeSize = (e) => {
    const target = e.target;
    textRef.current.style.height = "36px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  const props = {
    name: "file",
    listType: "picture",
    maxCount: 1,
    accept: "image/*",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImage(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmitComment = async () => {

    if (content.trim() === "") {
      message.error("Please enter your comment");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);
    formData.append("commentable_id", postId);
    if (type === "comment") {
      formData.append("commentable_type", "App\\Models\\Post");
    }
    if (type === "reply") {
      formData.append("commentable_type", "App\\Models\\Comment");
    }
    if (image) {
      formData.append("image", image);
    }
    const res = await axios.post("/comments/create", formData);
    console.log("res: ", res);
    if (res.status === 201) {
      resetForm();
      // add new comment to list comment
      addComment(res.data.comment);
      message.success("Comment successfully");
    } else {
      message.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setOpenSelectImage(false);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex pt-1  w-full mb-4">
      {/* Avatar */}
      <div className="flex justify-center items-top grow-0 mr-2">
        <img
          src={user.avatar}
          alt="avatar"
          className="min-w-[32px] h-[32px] rounded-[32px]"
        />
      </div>
      <div className="grow flex flex-col items-center ">
        {/*Input */}
        <div className=" text-sm text-[#050505] w-full bg-[#F0F2F5] rounded-[18px] flex items-center">
          <textarea
            type="text"
            className="bg-[#F0F2F5] rounded-[18px]  px-3 py-2 outline-none w-[500px] h-[36px] resize-none grow "
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              onChangeSize(e);
            }}
            ref={textRef}
          />
          <div className="grow-0 mr-2 relative flex items-center">
            {showEmojiPicker && (
              <div className="absolute bottom-[36px] right-0 z-50">
                <Picker
                  data={data}
                  onEmojiSelect={(e) => {
                    setContent(content + e.native);
                  }}
                />
              </div>
            )}
            <Button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              icon={<Smile size={24} color="#65676B" />}
              type="link"
            ></Button>
            {type === "comment" && (
              <Button
                icon={<Camera size={24} color="#65676B" />}
                type="link"
                onClick={() => {
                  if (openSelectImage) {
                    setImage(null);
                  }
                  setOpenSelectImage(!openSelectImage);
                }}
              />
            )}
            <Button
              icon={<Send size={24} color="#65676B" />}
              type="link"
              onClick={handleSubmitComment}
            />
          </div>
        </div>
        {/* Image display */}
        {openSelectImage && (
          <div className="w-full mt-2">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </div>
        )}
      </div>
    </div>
  );
}
