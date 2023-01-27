import { Popover, Tooltip } from "antd";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Share,
  Share2,
  ThumbsUp,
} from "react-feather";
import { useSelector } from "react-redux";
import axios from "~/api/axios";
import Angry from "~/public/reactions/facebook-angry.svg";
import Haha from "~/public/reactions/facebook-haha.svg";
import Like from "~/public/reactions/facebook-like.svg";
import Love from "~/public/reactions/facebook-love.svg";
import Sad from "~/public/reactions/facebook-sad.svg";
import Wow from "~/public/reactions/facebook-wow.svg";
import styles from "~/styles/Main.module.css";
import LikeButton from "./Like";
export default function PostCard({ item, key }) {
  const [reactions, setReactions] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [reactionArrBeforeFilter, setReactionArrBeforeFilter] = useState(
    item?.reactions
  );
  const [reactionUserFilterByType, setReactionUserFilterByType] = useState({
    like: {
      count: 0,
      list: [],
    },
    love: {
      count: 0,
      list: [],
    },
    haha: {
      count: 0,
      list: [],
    },

    wow: {
      count: 0,
      list: [],
    },
    sad: {
      count: 0,
      list: [],
    },
    angry: {
      count: 0,
      list: [],
    },
  });
  const [reactionUserFilterByTypeCount, setReactionUserFilterByTypeCount] =
    useState({
      count: 0,
      list: [],
    });
  const [comments, setComments] = useState([]);

  const handleReactions = async (reaction) => {
    if (reactions === null) {
      const res = await axios.post("/reactions/create", {
        reactionable_id: item.id,
        reactionable_type: "App\\Models\\Post",
        reaction: reaction,
      });
      if (res.data.status === "success") {
        setReactions(reaction);
        updateReaction(res.data.data, "create");
      }
    } else {
      const res = await axios.post("/reactions/delete", {
        reactionable_id: item.id,
      });
      if (res.data.status === "success") {
        setReactions(null);
        updateReaction(res.data.data, "delete");
      }
    }
  };

  const updateReaction = (reaction, type = "create") => {
    let newReactions = reactionArrBeforeFilter;
    if (type === "create") {
      newReactions.push(reaction);
    }
    if (type === "delete") {
      newReactions = newReactions.filter((item) => item.id !== reaction);
    }

    let likeCount = {
      like: {
        count: 0,
        list: [],
      },
      love: {
        count: 0,
        list: [],
      },
      haha: {
        count: 0,
        list: [],
      },
      wow: {
        count: 0,
        list: [],
      },
      sad: {
        count: 0,
        list: [],
      },
      angry: {
        count: 0,
        list: [],
      },
    };
    let count = 0;
    let list = [];
    //console.log('newReactions', newReactions)
    newReactions.forEach((item) => {
      list.push({
        name: item.user.first_name + " " + item.user.last_name,
        id: item.user.id,
      });
      count++;
      switch (item.reaction) {
        case "like":
          likeCount.like.count++;
          likeCount.like.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          item.user.first_name + " " + item.user.last_name;
          break;
        case "love":
          likeCount.love.count++;
          likeCount.love.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "haha":
          likeCount.haha.count++;
          likeCount.haha.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "wow":
          likeCount.wow.count++;
          likeCount.wow.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "sad":
          likeCount.sad.count++;
          likeCount.sad.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "angry":
          likeCount.angry.count++;
          likeCount.angry.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
      }
    });
    setReactionUserFilterByType(likeCount);
    setReactionUserFilterByTypeCount({
      count: count,
      list: list,
    });
    setReactionArrBeforeFilter(newReactions);
  };

  const displayReactionsContent = () => {
    if (reactions !== null) {
      return reactions[0].toUpperCase() + reactions.slice(1);
    }
  };

  const renderTooltipListUser = (arr) => {
    return (
      <div>
        {arr.list.map((item, index) => {
          return <div key={index}>{item.name}</div>;
        })}
      </div>
    );
  };

  const renderReaction = () => {
    let arr = Object.keys(reactionUserFilterByType).map((key) => {
      return {
        key: key,
        count: reactionUserFilterByType[key].count,
        list: reactionUserFilterByType[key].list,
      };
    });
    arr = arr.sort((a, b) => b.count - a.count);
    return (
      <>
        {arr.map((item, index) => {
          if (item.count > 0) {
            return (
              <Tooltip title={renderTooltipListUser(item)}>
                <div className=" mr-2 flex justify-center first-letter:items-center ">
                  <LikeButton reactions={item.key} />
                </div>
              </Tooltip>
            );
          }
        })}
      </>
    );
  };

  useEffect(() => {
    const reaction = reactionArrBeforeFilter?.find(
      (item) => item.user_id === user.id
    );
    if (reaction) {
      setReactions(reaction.reaction);
    } else {
      setReactions(null);
    }

    //Count likes, comment
    let likeCount = {
      like: {
        count: 0,
        list: [],
      },
      love: {
        count: 0,
        list: [],
      },
      haha: {
        count: 0,
        list: [],
      },
      wow: {
        count: 0,
        list: [],
      },
      sad: {
        count: 0,
        list: [],
      },
      angry: {
        count: 0,
        list: [],
      },
    };
    let count = 0;
    let list = [];
    reactionArrBeforeFilter?.forEach((item) => {
      list.push({
        name: item.user.first_name + " " + item.user.last_name,
        id: item.user.id,
      });
      count++;
      switch (item.reaction) {
        case "like":
          likeCount.like.count++;
          likeCount.like.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          item.user.first_name + " " + item.user.last_name;
          break;
        case "love":
          likeCount.love.count++;
          likeCount.love.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "haha":
          likeCount.haha.count++;
          likeCount.haha.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "wow":
          likeCount.wow.count++;
          likeCount.wow.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "sad":
          likeCount.sad.count++;
          likeCount.sad.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
        case "angry":
          likeCount.angry.count++;
          likeCount.angry.list.push({
            name: item.user.first_name + " " + item.user.last_name,
            id: item.user.id,
          });
          break;
      }
    });
    setReactionUserFilterByType(likeCount);
    setReactionUserFilterByTypeCount({
      count: count,
      list: list,
    });
    // console.log("reactionUserFilterByTypeCount", reactionUserFilterByTypeCount);
    // console.log("reactionUserFilterByType", reactionUserFilterByType);
  }, []);

  return (
    <div className={styles.card}>
      {/* Avatar box */}
      <div className="flex justify-between">
        <div className="flex">
          {/* Avatar */}
          <div className="w-[45px] h-[45px] mb-4 mr-4">
            <img
              src={item?.user.avatar}
              alt="avatar"
              className="w-full h-full rounded-[45px]"
            />
          </div>
          {/* Name */}
          <div className=" text-xs mt-1 mb-2">
            <span className="text-default font-bold  block">
              {item?.user.first_name + " " + item?.user.last_name}
            </span>
            <span className="text-gray-500 block">
              {moment(item?.created_at).fromNow()}
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
      <div className="text-lg mb-2 text-gray-text break-all leading-[26px] font-medium ">
        {item?.content}
      </div>
      {/* Image */}
      <div className="mb-3 w-full">
        <img
          src="http://sociala.uitheme.net/assets/images/t-10.jpg"
          alt="avatar"
          className="w-full  rounded-[15px]"
        />
      </div>
      {/* Like, Comment, Share count*/}
      <div className="flex justify-between items-center text-xs">
        <div className="flex">
          {/* Like */}
          <div className=" flex  justify-start items-center mr-2">
            {renderReaction()}
            <Tooltip
              title={renderTooltipListUser(reactionUserFilterByTypeCount)}
            >
              <div className="font-semibold">
                {reactionUserFilterByTypeCount.count}
              </div>
            </Tooltip>
          </div>
          {/* Comment */}
          <div className=" flex justify-start items-center mr-2 ">
            <div className="w-[25px] h-[25px] mr-2 flex justify-center rounded-[25px] items-center ">
              <MessageCircle size={25} color="black" className="" />
            </div>
            <div className="font-semibold">22 Comment</div>
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
          <Popover
            content={
              <div className="flex justify-between items-center w-[200px] laptop:w-[250px]">
                <div onClick={() => handleReactions("like")}>
                  <Image src={Like} width={25} height={25} alt="like" />
                </div>
                <div onClick={() => handleReactions("love")}>
                  <Image src={Love} width={25} height={25} alt="love" />
                </div>
                <div onClick={() => handleReactions("haha")}>
                  <Image src={Haha} width={25} height={25} alt="haha" />
                </div>
                <div onClick={() => handleReactions("wow")}>
                  <Image src={Wow} width={25} height={25} alt="wow" />
                </div>
                <div onClick={() => handleReactions("sad")}>
                  <Image src={Sad} width={25} height={25} alt="sad" />
                </div>
                <div onClick={() => handleReactions("angry")}>
                  <Image src={Angry} width={25} height={25} alt="angry" />
                </div>
              </div>
            }
          >
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
          </Popover>
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
        <div className="flex justify-center items-center text-[#6B7280]  grow h-full hover:bg-gray-100 rounded-[6px] cursor-pointer	">
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
    </div>
  );
}
