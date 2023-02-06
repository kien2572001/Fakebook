import React from "react";
import moment from "moment";
import { Image } from "antd";
import { useSelector } from "react-redux";
import axios from "~/api/axios";
import { useEffect, useState } from "react";
import ReactionsRender from "~/components/common/ReactionsRender";
import ReactionBar from "~/components/common/ReactionsBar";
import ReplyList from "./ReplyList";
import Link from "next/link";
export default function Comment({ comment, type = "comment" }) {
  const user = useSelector((state) => state.user.user);
  const [reactions, setReactions] = useState(null);
  const [reactionArr, setReactionArr] = useState(comment?.reactions);
  const [showReply, setShowReply] = useState(false);
  const handleReactions = async (reaction) => {
    if (reactions === null) {
      const res = await axios.post("/reactions/create", {
        reactionable_id: comment.id,
        reactionable_type: "App\\Models\\Comment",
        reaction: reaction,
      });
      if (res.data.status === "success") {
        setReactions(reaction);
        updateReaction(res.data.data, "create");
      }
    } else {
      const res = await axios.post("/reactions/delete", {
        reactionable_id: comment.id,
      });
      if (res.data.status === "success") {
        setReactions(null);
        updateReaction(res.data.data, "delete");
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
    if (reactions === "like") {
      return (
        <span
          className=" text-xs px-2 hover:underline select-none text-[#548BF6]"
          onClick={() => {
            handleReactions("like");
          }}
        >
          Like
        </span>
      );
    }
    if (reactions === "love") {
      return (
        <span
          className=" text-xs px-2 hover:underline select-none text-[#F63E7B]"
          onClick={() => {
            handleReactions("like");
          }}
        >
          Love
        </span>
      );
    }
    if (reactions === "haha") {
      return (
        <span
          className=" text-xs px-2 hover:underline select-none text-[#F7B500]"
          onClick={() => {
            handleReactions("like");
          }}
        >
          Haha
        </span>
      );
    }
    if (reactions === "wow") {
      return (
        <span
          className=" text-xs px-2 hover:underline select-none text-[#F7B500]"
          onClick={() => {
            handleReactions("like");
          }}
        >
          Wow
        </span>
      );
    }
    if (reactions === "sad") {
      return (
        <span
          className=" text-xs px-2 hover:underline select-none text-[#F7B500]"
          onClick={() => {
            handleReactions("like");
          }}
        >
          Sad
        </span>
      );
    }
    if (reactions === "angry") {
      return (
        <span
          className=" text-xs px-2 hover:underline select-none text-[#F7B500]"
          onClick={() => {
            handleReactions("like");
          }}
        >
          Angry
        </span>
      );
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

  useEffect(() => {
    if (type === "reply") {
      console.log("comment", comment);
    }
    let reaction = null;
    let check = false;
    for (let i = 0; i < reactionArr.length; i++) {
      if (reactionArr[i].listUser) {
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
    }
    if (check) {
      setReactions(reaction);
    } else {
      setReactions(null);
    }
  }, []);

  return (
    <div className="flex pt-1 w-full">
      {/* Avatar */}
      <div className="flex justify-center items-top grow-0 mr-2">
        <Link href={`/profile/${comment.user.id}`}>
          <img
            src={comment.user.avatar}
            alt="avatar"
            className="min-w-[32px] h-[32px] rounded-[32px]"
          />
        </Link>
      </div>
      {/* Content */}
      <div className="flex flex-col grow">
        <div className="grow text-sm text-[#050505]">
          <div className="inline-block bg-[#F0F2F5] rounded-[18px] px-3 py-2">
            <div className="flex items-start flex-col ">
              <Link href={`/profile/${comment.user.id}`}>
                <span className=" font-semibold">
                  {comment.user.first_name + " " + comment.user.last_name}
                </span>
              </Link>
              <div className="">
                <span className="">{comment.content}</span>
              </div>
            </div>
          </div>
          {comment.image && (
            <div className="w-full max-h-[200px] mt-1">
              {/* <img
                src={comment.image}
                alt="comment"
                className="max-h-[200px] rounded-[20px]"
              /> */}
              <Image src={comment.image} alt="comment" height={200} />
            </div>
          )}
          {/* Like response */}
          <div className="flex items-center font-semibold ml-1 mt-1 cursor-default h-[22px]">
            {reactions === null ? (
              <ReactionBar handleReactions={handleReactions}>
                <span
                  className=" text-xs px-2 hover:underline select-none"
                  onClick={() => {
                    handleReactions("like");
                  }}
                >
                  Like
                </span>
              </ReactionBar>
            ) : (
              <>{displayReactionsContent()}</>
            )}
            {type === "comment" && (
              <span
                className=" text-xs px-2 hover:underline"
                onClick={() => setShowReply(!showReply)}
              >
                Reply
              </span>
            )}
            <span className=" text-xs px-2 font-normal text-[#65676B]">
              {moment(comment.created_at).fromNow()}
            </span>
            <ReactionsRender reactions={reactionArr} type={"comment"} />
          </div>
          {/* Reply */}
          {showReply && <ReplyList id={comment.id} />}
        </div>
      </div>
    </div>
  );
}
