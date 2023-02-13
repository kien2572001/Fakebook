import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import axios from "~/api/axios";
import { v4 as uuidv4 } from "uuid";
import { Spin } from "antd";
export default function CommentList({ id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const res = await axios.get(`/posts/${id}/comments`);
      //console.log("comments: ", res.data.data);
      setComments(
        res.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
      console.log("comments: ", res.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };
    fetchComments();
  }, []);

  const addComment = (comment) => {
    setComments([comment, ...comments]);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Spin  />
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <CreateComment postId={id} addComment={addComment} />
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <Comment key={uuidv4()} comment={comment} />
            ))}
        </div>
      )}
    </>
  );
}
