import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListPost from "~/components/layouts/ListPost";
import axios from "~/api/axios";
import { Button, Avatar, Tooltip } from "antd";
export default function MyGroup({ userData, groupData }) {
  const router = useRouter();
  const isAdmin = groupData?.isAdmin || "none"; // none, admin, member
  const { id } = router.query;
  const [listMember, setListMember] = useState(groupData?.members || []);
  useEffect(() => {
    console.log("groupData", groupData);
  }, [groupData]);

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
            <Button type="primary" danger className="font-semibold">
              Invite
            </Button>
          )}
        </div>
        {/* Group content */}
        <div className="flex mt-6 w-full">
          <div className="w-[400px] mr-6">
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
    </div>
  );
}
