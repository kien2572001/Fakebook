import { useEffect } from "react";
import { Filter, Search, Video, Plus } from "react-feather";
import { Tooltip, Button, Modal, Select, message, Spin } from "antd";
import { useState } from "react";
import axios from "~/api/axios";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const Group = ({ userData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createGroupName, setCreateGroupName] = useState("");
  const [createGroupDescription, setCreateGroupDescription] = useState("");
  const [createGroupPrivacy, setCreateGroupPrivacy] = useState("public");
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const router = useRouter();
  const clearModal = () => {
    setCreateGroupName("");
    setCreateGroupDescription("");
    setCreateGroupPrivacy("public");
    setIsModalVisible(false);
  };

  const handleCreateGroup = async () => {
    const res = await axios.post("/groups/create", {
      name: createGroupName,
      about: createGroupDescription,
      privacy: createGroupPrivacy,
    });
    //console.log("group created: ", res.data);
    if (res.status === 200) {
      clearModal();
      router.push(`/groups/${res.data.data.id}`);
    } else {
      message.error("Something went wrong! Please try again later.");
    }
  };

  const fetchGroups = async () => {
    const res = await axios.get("/groups/list", {
      params: {
        page: page,
      },
    });
    //console.log("groups: ", res.data);
    if (res.status === 200) {
      setGroups([...groups, ...res.data.data.data]);
      setLastPage(res.data.data.last_page);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="mx-32 w-4/5 mt-4">
      <div className="w-full p-6 flex justify-between h-[90px] bg-white items-center rounded-md">
        <p className="text-2xl font-bold">Group</p>
        <div className="flex h-full">
          <div className="flex bg-gray-100 text-gray-400 justify-center items-center rounded-md relative mr-2 cursor-pointer">
            <input
              type="text"
              placeholder="Search here."
              className="outline-none px-4 py-2 bg-gray-100 rounded text-sm pr-8"
            />
            <Search width={20} className="absolute right-2" />
          </div>
          <div className="flex justify-center items-center bg-gray-100 h-full py-2 px-3 rounded mr-2 cursor-pointer">
            <Filter width={20} className="text-gray-400" />
          </div>
          <Tooltip title="Create Group">
            <div
              className="flex justify-center items-center bg-gray-100 h-full py-2 px-3 rounded cursor-pointer"
              onClick={() => setIsModalVisible(true)}
            >
              <Plus width={20} className="text-gray-400" />
            </div>
          </Tooltip>
        </div>
      </div>
      <InfiniteScroll
        dataLength={groups.length}
        next={fetchGroups}
        hasMore={page <= lastPage}
        loader={
          <div className="flex justify-center items-center mt-4">
            <Spin />
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
          {groups.map((group) => {
            return (
              <div
                className="w-full h-[240px] bg-white rounded overflow-hidden shadow-md"
                key={uuidv4()}
              >
                <Link href={`/groups/${group.id}`}>
                  <img
                    src={group.cover_image}
                    alt="image-profile"
                    className="w-full h-3/5 object-cover"
                  />
                </Link>
                <div className="h-1/2 w-full relative ">
                  <div className="ml-4 pt-3 flex items-center justify-between">
                    <div>
                      <Link href={`/groups/${group.id}`}>
                        <p className="font-semibold text-xl">{group.name}</p>
                      </Link>
                      <p className="text-[14px] text-gray-text">
                        {"100K members"}
                      </p>
                    </div>
                    <div className="flex mr-4">
                      <Button
                        className="ml-2 px-6 py-1 rounded-full text-white font-semibold text-sm h-[45px]"
                        type="primary"
                        style={{
                          backgroundColor: "#1890ff",
                          "$:hover": {
                            backgroundColor: "#40a9ff",
                          },
                        }}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      <Modal
        title="Create Group"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <div className="flex justify-end">
            <Button
              className=""
              type="primary"
              style={{
                backgroundColor: "#1890ff",
                "$:hover": {
                  backgroundColor: "#40a9ff",
                },
              }}
              onClick={handleCreateGroup}
            >
              Create
            </Button>
            <Button className="ml-2" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm font-semibold mb-1">
              Group Name
            </label>
            <input
              type="text"
              placeholder="Group Name"
              className="outline-none px-4 py-2 bg-gray-100 rounded text-sm"
              value={createGroupName}
              onChange={(e) => setCreateGroupName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-gray-500 text-sm font-semibold mb-1">
              Group Description
            </label>
            <input
              type="text"
              placeholder="Group Description"
              className="outline-none px-4 py-2 bg-gray-100 rounded text-sm"
              value={createGroupDescription}
              onChange={(e) => setCreateGroupDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-gray-500 text-sm font-semibold mb-1">
              Group privacy
            </label>
            <Select
              placeholder="Select Group Type"
              className="w-full"
              style={{ borderRadius: "0.375rem" }}
              onChange={(value) => setCreateGroupPrivacy(value)}
            >
              <Select.Option value="public">
                <span className="font-semibold">Public:</span> Everyone can see
                and join
              </Select.Option>
              <Select.Option value="private">
                <span className="font-semibold">Private:</span> Only members can
                see and join
              </Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Group;
