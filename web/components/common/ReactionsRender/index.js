import React from "react";
import { useState, useEffect } from "react";
import { Tooltip } from "antd";
import LikeButton from "~/components/layouts/ListPost/PostCard/Like";
import { v4 as uuidv4 } from "uuid";
export default function ReactionsRender({ reactions, type = "post" }) {

  useEffect(() => {
    console.log("reactions", reactions);
  }, [reactions]);

  const renderTooltipListUser = (arr) => {
    return (
      <div>
        {arr.listUser.map((item) => {
          return <div key={uuidv4()}>{item.name}</div>;
        })}
      </div>
    );
  };

  return (
    <>
      {type === "post" ? (
        <>
          {reactions.map((item) => {
            if (item.count > 0) {
              return (
                <Tooltip
                  title={renderTooltipListUser(item)}
                >
                  <div className=" mr-2 flex justify-center first-letter:items-center ">
                    <LikeButton reactions={item.reaction} />
                  </div>
                </Tooltip>
              );
            }
          })}
        </>
      ) : (
        <div>Comment</div>
      )}
    </>
  );
}
