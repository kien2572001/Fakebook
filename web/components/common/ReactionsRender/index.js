import React from "react";
import { useState, useEffect } from "react";
import { Tooltip } from "antd";
import LikeButton from "~/components/layouts/ListPost/PostCard/Like";
import { v4 as uuidv4 } from "uuid";
export default function ReactionsRender({ reactions, type = "post" }) {
  const renderTooltipListUser = (arr) => {
    return (
      <div>
        {arr.listUser.map((item) => {
          return <div key={uuidv4()}>{item.name}</div>;
        })}
      </div>
    );
  };

  const renderReactionsTooltipComment = (arr) => {
    let listUser = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].count > 0) {
        listUser = [...listUser, ...arr[i].listUser];
      }
    }
    return (
      <div>
        <>
          {arr.map((item) => {
            if (item.count > 0) {
              return (
                  <div className="flex justify-center first-letter:items-center " key={uuidv4()}>
                    <LikeButton reactions={item.reaction}  size={14}/>{" "}
                    <span className="ml-1">{item.count}</span>
                  </div>
              );
            }
          })}
        </>
        <>
          {listUser.map((item) => {
            return <div key={uuidv4()}>{item.name}</div>;
          })}
        </>
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
                <Tooltip title={renderTooltipListUser(item)} key={uuidv4()}>
                  <div className=" mr-2 flex justify-center first-letter:items-center ">
                    <LikeButton reactions={item.reaction} />
                  </div>
                </Tooltip>
              );
            }
          })}
        </>
      ) : (
        <>
          <div className="p-1 bg-white rounded shadow-xl">
            <Tooltip title={renderReactionsTooltipComment(reactions)}>
              {reactions.map((item) => {
                if (item.count > 0) {
                  return (
                    <div className=" flex justify-center first-letter:items-center " key={uuidv4()}>
                      <LikeButton reactions={item.reaction} size={14} />
                    </div>
                  );
                }
              })}
            </Tooltip>
          </div>
        </>
      )}
    </>
  );
}
