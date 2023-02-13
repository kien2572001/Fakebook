import React, { useEffect, useState } from "react";
import Comment from "~/components/layouts/ListPost/PostCard/CommentList/Comment";
import CreateComment from "~/components/layouts/ListPost/PostCard/CommentList/CreateComment";
import axios from "~/api/axios";
import { v4 as uuidv4 } from "uuid";
import { Spin } from "antd";
export default function ReplyList({ id }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const addReply = (reply) => {
    setReplies([reply, ...replies]);
  };

  useEffect(() => {
    const fetchReplies = async () => {
      setLoading(true);
      const res = await axios.get(`/comments/${id}/replies`);
      console.log("replies: ", res.data.replies);
      setReplies(res.data.replies);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };
    fetchReplies();
  }, []);

  useEffect(() => {
    console.log("replies: ", replies);
  }, [replies]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col items-start">
          {replies &&
            replies.length > 0 &&
            replies.map((reply) => (
              <Comment key={uuidv4()} comment={reply} type="reply" />
            ))}
          <CreateComment postId={id} addComment={addReply} type="reply" />
        </div>
      )}
    </>
  );
}
