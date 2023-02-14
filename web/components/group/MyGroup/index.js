import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListPost from "~/components/layouts/ListPost";
import axios from "~/api/axios";
import {
  Button,
  Avatar,
  Tooltip,
  Modal,
  Input,
  Empty,
  Spin,
  message,
} from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
export default function MyGroup({ userData, groupData }) {
  const router = useRouter();
  const isAdmin = groupData?.isAdmin || "none"; // none, admin, member
  const { id } = router.query;
  const [listMember, setListMember] = useState(groupData?.members || []);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSuggestions, setInviteSuggestions] = useState([]);
  const [inviteSelected, setInviteSelected] = useState([]);
  useEffect(() => {
    console.log("groupData", groupData);
  }, [groupData]);

  const handleGetInviteSuggestions = async (e) => {
    const res = await axios.get("/groups/invite-suggestion", {
      params: {
        group_id: id,
        name: e.target.value,
      },
    });
    if (res.status === 200) {
      let temp = res.data.data;
      if (typeof temp === "object") {
        temp = Object.values(temp);
      }
      setInviteSuggestions(temp);
    }
  };

  useEffect(() => {
    handleGetInviteSuggestions({ target: { value: "" } });
  }, []);

  const handleSelectInvite = (user) => {
    //check if user is already selected
    if (inviteSelected.find((item) => item.id === user.id)) {
      return;
    }

    setInviteSelected([...inviteSelected, user]);
    setInviteSuggestions(
      inviteSuggestions.filter((item) => item.id !== user.id)
    );
  };

  const handleRemoveInvite = (user) => {
    setInviteSelected(inviteSelected.filter((item) => item.id !== user.id));
  };

  const handleInvite = async () => {
    let temp = inviteSelected.map((item) => item.id);
    const res = await axios.post("/groups/invite-list", {
      group_id: id,
      users: temp,
    });
    if (res.status === 200) {
      setShowInviteModal(false);
      setInviteSelected([]);
      setInviteSuggestions([]);
      message.success("Invited successfully!");
    }
  };

  return (
    <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[1200px]">
      <div className="w-full">
        {/* Cover image */}
        <div className="relative w-full h-[400px]">
          <img
            src={groupData?.cover_image}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
        {/* Group header */}
        <div className="flex items-center justify-between bg-white rounded-md p-6">
          <div>
            <p className="font-semibold text-2xl">{groupData?.name}</p>
            <Avatar.Group>
              {listMember.map((member) => (
                <Tooltip title={member.name}>
                  <Avatar
                    key={member.id}
                    src={member.avatar}
                    className="cursor-pointer"
                    // onClick={() => router.push(`/users/${member.id}`)}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
          {isAdmin === "none" ? (
            <Button type="primary" danger className="font-semibold">
              Join
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              className="font-semibold"
              onClick={() => setShowInviteModal(true)}
            >
              Invite
            </Button>
          )}
        </div>
        {/* Group content */}
        <div className="flex w-full">
          <div className="w-[400px] mr-6 mt-3">
            <div className="bg-white rounded-md p-6 w-full">
              <p className="font-semibold text-xl">About</p>
              <p className="mt-3">{groupData?.about}</p>
            </div>
          </div>
          <div className="w-full">
            <ListPost userData={userData} />
          </div>
        </div>
      </div>

      <Modal
        title="Invite friends to join group"
        visible={showInviteModal}
        onCancel={() => setShowInviteModal(false)}
        footer={
          <Button
            onClick={handleInvite}
            type="primary"
            danger
            className="font-semibold"
          >
            Invite
          </Button>
        }
      >
        <div className="flex h-[350px]">
          <div className="basis-1/2">
            <Input
              placeholder="Search for friends by name"
              onChange={(e) => handleGetInviteSuggestions(e)}
            />
            <div className="mt-3 ">
              <p className="font-semibold">Suggested</p>
              <>
                {inviteSuggestions.slice(0, 5).map((suggestion) => {
                  return (
                    <div className="flex mt-3 w-full" key={uuidv4()}>
                      <Avatar src={suggestion.avatar} size={40} />
                      <div className="ml-3 flex items-center justify-between w-full mr-2">
                        <p className="font-semibold ">{suggestion.name}</p>
                        <Button
                          type="text"
                          icon={<PlusCircleOutlined />}
                          onClick={() => handleSelectInvite(suggestion)}
                        />
                      </div>
                    </div>
                  );
                })}
                {inviteSuggestions.length === 0 && <Empty title="No data" />}
              </>
            </div>
          </div>
          <div className="basis-1/2 pt-12">
            <p>
              {" "}
              {inviteSelected.length > 0 ? inviteSelected.length : "No "}
              {"  "}
              friends selected
            </p>
            <div className="overflow-y-auto h-[280px]">
              {inviteSelected.length > 0 &&
                inviteSelected.map((selected) => {
                  return (
                    <div className="flex mt-3 w-full" key={uuidv4()}>
                      <Avatar src={selected.avatar} size={40} />
                      <div className="ml-3 flex items-center justify-between w-full mr-2">
                        <p className="font-semibold ">{selected.name}</p>
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => handleRemoveInvite(selected)}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
