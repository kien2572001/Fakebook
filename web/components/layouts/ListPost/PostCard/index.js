import { Popover, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Share,
  Share2,
  ThumbsUp,
  Users,
  Globe,
  Lock,
} from "react-feather";
import { useSelector } from "react-redux";
import styles from "~/styles/Main.module.css";
import axios from "~/api/axios";
import CommentList from "./CommentList";
import { v4 as uuidv4 } from "uuid";
import LikeButton from "./Like";
import ReactionsRender from "~/components/common/ReactionsRender";
import ReactionBar from "~/components/common/ReactionsBar";
import { Image } from "antd";
import Link from "next/link";
import Gallery from "./Gallery";
import { message } from "antd";

export default function PostCard({ item, index }) {
  const [reactions, setReactions] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [reactionArr, setReactionArr] = useState(item?.reactions);
  const [showComment, setShowComment] = useState(false);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [comments_count, setCommentsCount] = useState(item.comments_count);

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  const handleReactions = async (reaction) => {
    if (reactions === null) {
      const res = await axios.post("/reactions/create", {
        reactionable_id: item.id,
        reactionable_type: "App\\Models\\Post",
        reaction: reaction,
        notification_target_id: item.user.id,
      });
      if (res.data.status === "success") {
        setReactions(reaction);
        updateReaction(res.data.data, "create");
      } else {
        setReactions(null);
        message.error("Something went wrong");
      }
    } else {
      const res = await axios.post("/reactions/delete", {
        reactionable_id: item.id,
      });
      if (res.data.status === "success") {
        setReactions(null);
        updateReaction(res.data.data, "delete");
      } else {
        message.error("Something went wrong");
      }
    }
  };

  const updateReaction = (data, type) => {
    //console.log("data", data);
    if (type === "create") {
      let user = {
        id: data.user_id,
        name: data.user.first_name + " " + data.user.last_name,
      };
      let arr = reactionArr;
      //console.log("arr", arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].reaction === data.reaction) {
          arr[i].count += 1;
          arr[i].listUser.push(user);
        }
      }
      setReactionArr(arr);
    }
    if (type === "delete") {
      let arr = reactionArr;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].reaction === data.reaction) {
          arr[i].count -= 1;
          arr[i].listUser = arr[i].listUser.filter(
            (item) => item.id !== data.user_id
          );
        }
      }
      setReactionArr(arr);
    }
  };

  const displayReactionsContent = () => {
    if (reactions !== null) {
      return reactions[0].toUpperCase() + reactions.slice(1);
    }
  };

  const renderTooltipListUser = (arr) => {
    let listUser = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].listUser.length; j++) {
        listUser.push(arr[i].listUser[j]);
      }
    }
    return (
      <div>
        {listUser?.map((item) => {
          return <div key={uuidv4()}>{item.name}</div>;
        })}
      </div>
    );
  };

  const renderContent = () => {
    if (item.content === null) {
      return null;
    }
    let temp = item.content;
    if (item.content.includes("<br>")) {
      temp = item.content.split("<br>");
      console.log("temp", temp);
    } else {
      return temp;
    }
    return (
      <>
        {temp.map((item, index) => {
          return <p key={uuidv4()}>{item}</p>;
        })}
      </>
    );
  };

  useEffect(() => {
    //console.log("item", item);
    let reaction = null;
    let check = false;
    for (let i = 0; i < reactionArr.length; i++) {
      for (let j = 0; j < reactionArr[i].listUser.length; j++) {
        if (reactionArr[i].listUser[j].id === user.id) {
          reaction = reactionArr[i].reaction;
          check = true;
          break;
        }
      }
      if (check) {
        break;
      }
    }
    if (check) {
      setReactions(reaction);
    } else {
      setReactions(null);
    }
    renderListImage();
  }, []);

  const renderListImage = () => {
    const listImage = item?.sub_posts?.map((item) => {
      return item.image.path;
    });

    return <Gallery listImage={listImage} boxSize={dimensions} />;
  };

  const renderPostPermission = (size) => {
    if (item?.permission === "public") {
      return (
        <Tooltip title="Public" placement="top">
          <Globe size={size} />
        </Tooltip>
      );
    } else if (item?.permission === "friends") {
      return (
        <Tooltip title="Friends" placement="top">
          <Users size={size} />
        </Tooltip>
      );
    } else if (item?.permission === "only_me") {
      return (
        <Tooltip title="Only me" placement="top">
          <Lock size={size} />
        </Tooltip>
      );
    }
  };

  return (
    <div className={styles.card} ref={targetRef}>
      {/* Avatar box */}
      <div className="flex justify-between">
        <div className="flex">
          {/* Avatar */}
          <div className="w-[45px] h-[45px] mb-4 mr-4">
            <Link href={`/profile/${item?.user.id}`}>
              <img
                src={item?.user.avatar}
                alt="avatar"
                className="w-full h-full rounded-[45px]"
              />
            </Link>
          </div>
          {/* Name */}
          <div className=" text-xs mt-1 mb-2">
            <Link href={`/profile/${item?.user.id}`}>
              <span className="text-default font-bold  block">
                {item?.user.first_name + " " + item?.user.last_name}
              </span>
            </Link>
            <span className="text-gray-500 block">
              {moment(item?.created_at).fromNow()}

              <span className="ml-1">{renderPostPermission(15)}</span>
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="w-[45px] h-[45px] rounded-[45px] flex justify-center items-center bg-background cursor-pointer">
            <MoreHorizontal size={23} />
          </div>
        </div>
      </div>
      {/* Content */}
      <span className="text-lg mb-2 text-black  leading-[26px] font-medium break-words">
        {renderContent()}
      </span>
      {/* Image */}
      <div className="mb-3 w-full">{renderListImage()}</div>
      {/* Like, Comment, Share count*/}
      <div className="flex justify-between items-center text-xs">
        <div className="flex">
          {/* Like */}
          <div className=" flex  justify-start items-center mr-2">
            {/* {renderReaction()} */}
            <ReactionsRender type="post" reactions={reactionArr} />
            {reactionArr?.length > 0 && (
              <Tooltip title={renderTooltipListUser(reactionArr)}>
                <div className="font-semibold">
                  {reactionArr.reduce((a, b) => a + b.count, 0)}
                </div>
              </Tooltip>
            )}
          </div>
          {/* Comment */}
          <div className=" flex justify-start items-center mr-2 ">
            <div className="w-[25px] h-[25px] mr-2 flex justify-center rounded-[25px] items-center ">
              <MessageCircle size={25} color="black" className="" />
            </div>
            {comments_count > 0 && (
              <div className="font-semibold">
                {comments_count} {
                  " "
                }
                comments
              </div>
            )}
          </div>
        </div>
        {/* Share */}
        <div className=" flex justify-end items-center mr-2 font-semibold">
          <Share2 size={25} color="black" className="" />
          <span className=" ml-2">Share</span>
        </div>
      </div>
      {/* Button like share comment */}
      <div className="flex justify-around items-center text-xs mt-3 h-[40px] border-t border-solid border-[#adb5bd] py-1">
        {/* Like btn */}
        {reactions === null ? (
          <ReactionBar handleReactions={handleReactions}>
            <div
              className="flex justify-center items-center text-[#6B7280]  grow h-full hover:bg-gray-100 rounded-[6px] cursor-pointer	"
              onClick={() => {
                handleReactions("like");
              }}
            >
              <div className="flex justify-center items-center h-full ">
                <ThumbsUp size={18} color="#6B7280" className="" />
                <span className=" ml-2 text-[15px] font-semibold">Like</span>
              </div>
            </div>
          </ReactionBar>
        ) : (
          <div
            className="flex justify-center items-center text-[#6B7280]  grow h-full hover:bg-gray-100 rounded-[6px] cursor-pointer	"
            onClick={() => {
              handleReactions("like");
            }}
          >
            <div className="flex justify-center items-center h-full ">
              <LikeButton reactions={reactions} />
              <span className=" ml-2 text-[15px] font-semibold text-[#548BF6]">
                {displayReactionsContent()}
              </span>
            </div>
          </div>
        )}
        {/* Comment btn */}
        <div
          className="flex justify-center items-center text-[#6B7280]  grow h-full hover:bg-gray-100 rounded-[6px] cursor-pointer	"
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          <div className="flex justify-center items-center h-full ">
            <MessageSquare size={18} color="#6B7280" className="" />
            <span className=" ml-2 text-[15px] font-semibold">Comment</span>
          </div>
        </div>
        {/* Share btn */}
        <div className="flex justify-center items-center text-[#6B7280]  grow h-full hover:bg-gray-100 rounded-[6px] cursor-pointer	">
          <div className="flex justify-center items-center h-full ">
            <Share size={18} color="#6B7280" className="" />
            <span className=" ml-2 text-[15px] font-semibold">Share</span>
          </div>
        </div>
      </div>
      {/* Comment box */}
      {showComment && <CommentList id={item.id} />}
      {/* End of comment box */}
    </div>
  );
}
