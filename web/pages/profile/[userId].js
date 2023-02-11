import { useContext, useEffect,useState } from "react";
import { parserUserCookies } from "~/ultis/parser";
import {
  ExternalLink,
  Eye,
  Lock,
  Mail,
  MapPin,
  MoreHorizontal,
  Users,
} from "react-feather";
import MainLayout from "~/components/layouts/MainLayout";
import AuthContext from "~/contexts/AuthContext";
import ListPost from "~/components/layouts/ListPost";
import axios from "~/api/axios";
import { Button, Dropdown, Menu, message } from "antd";

export async function getServerSideProps(context) {
  const userData = parserUserCookies(context.req.cookies);
  if (!userData) {
    return {
      redirect: {
        destination: "auth/login",
        permanent: false,
      },
    };
  }

  const userId = context.params.userId;
  let thisProfileUser = null;
  let checkFriend = "false";
  if (userId !== userData.id) {
    try {
      const response = await axios.get(
        `${process.env.SERVER_API_HOST}/api/users/${userId}/information`
      );
      thisProfileUser = response.data?.data;
    } catch (error) {
      //console.log(error);
    }
  } else {
    thisProfileUser = userData;
  }

  return {
    props: {
      userData: userData,
      thisProfileUser: thisProfileUser,
    },
  };
}

export default function profile({ userData, thisProfileUser }) {
  const [checkRelation, setCheckRelation] = useState("none");
  const [source_id, setSource_id] = useState(userData.id);
  const [target_id, setTarget_id] = useState(thisProfileUser.id);

  const friendSelectItems = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => handleCancelFriend()}>Cancel friend</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div> Block</div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const checkFriend = async () => {
      try {
        const response = await axios.get(
          "/friends/check/" + thisProfileUser.id
        );
        console.log('response', response.data.data)
        if (response.status === 200) {
          setCheckRelation(response.data.data?.status);
        }
        setSource_id(response.data.data?.source_id);
        setTarget_id(response.data.data?.target_id);
      } catch (error) {
        console.log(error);
      }
    };
    if (userData.id !== thisProfileUser.id) {
      checkFriend();
    } else {
      setCheckRelation("myself");
    }
  }, []);

  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/friends/add/", {
        target_id: thisProfileUser.id,
      });
      if (response.status === 200) {
        setCheckRelation(response.data.data?.status);
        message.success("Send friend request successfully");
      } else {
        message.error("Send friend request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectFriend = async () => {
    try {
      const response = await axios.post("/friends/reject/", {
        user_id: source_id,
      });
      if (response.status === 200) {
        setCheckRelation(response.data.data?.status);
        message.success("Reject friend successfully");
      } else {
        message.error("Reject friend failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriend = async () => {
    try {
      const response = await axios.post("/friends/accept/", {
        user_id: source_id,
      });
      if (response.status === 200) {
        setCheckRelation(response.data.data?.status);
        message.success("Accept friend successfully");
      } else {
        message.error("Accept friend failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelFriend = async () => {
    try {
      const response = await axios.post("/friends/delete/", {
        user_id: thisProfileUser.id,
      });
      if (response.status === 200) {
        setCheckRelation("none");
        message.success("Cancel friend successfully");
      } else {
        message.error("Cancel friend failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderFriendButton = () => {
    if (checkRelation === "myself") {
      return;
    } else if (checkRelation === "none" || checkRelation === "reject") {
      return (
        <button
          className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
          onClick={() => handleAddFriend()}
        >
          Add friend
        </button>
      );
    } else if (checkRelation === "pending") {
      if (source_id === userData.id) {
        return (
          <button
            className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
            onClick={() => handleAddFriend()}
          >
            Cancel request
          </button>
        );
      } else {
        return (
          <>
            <button
              className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
              onClick={() => handleAcceptFriend()}
            >
              Accept request
            </button>
            <button
              className="bg-danger text-white px-4 py-2 rounded-md font-semibold text-sm mr-2"
              onClick={() => handleRejectFriend()}
            >
              Reject request
            </button>
          </>
        );
      }
    } else if (checkRelation === "accepted") {
      return (
        <Dropdown overlay={friendSelectItems}>
          <button className="bg-[#10D876] text-white px-4 py-2 rounded-md font-semibold text-sm mr-2">
            Friend
          </button>
        </Dropdown>
      );
    }
  };

  return (
    <MainLayout userData={userData}>
      <div className="mini-desktop:mx-32">
        {/* Profile Header */}
        <div className="py-4 my-2 h-[360px] tablet:h-[400px] mini-desktop:h-[436px] rounded-2xl bg-white relative drop-shadow-md">
          <div className="rounded-2xl overflow-hidden px-4 h-3/5 ">
            <img
              src="http://sociala.uitheme.net/assets/images/u-bg.jpg"
              alt="image-background"
              className="w-full h-full object-fit rounded-2xl"
            />
          </div>

          <div className="flex relative px-4">
            <div className="absolute -top-[30px] left-8 w-[108px] h-[108px] rounded-full bg-white flex justify-center items-center">
              <img
                src={
                  thisProfileUser?.avatar ||
                  "http://sociala.uitheme.net/assets/images/user-12.png"
                }
                alt="image-profile"
                className="w-[100px] h-[100px] rounded-full object-cover "
              />
            </div>
            <div className=" ml-36 mt-4 flex w-full justify-between">
              <div>
                <p className="font-bold text-xl">
                  {thisProfileUser?.firstName +
                    " " +
                    thisProfileUser?.lastName || "Người dùng facebook"}
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  {thisProfileUser?.email}
                </p>
              </div>
              <div className="flex items-center max-tablet:hidden">
                {renderFriendButton()}
                <div className=" bg-[#f5f5f5] w-[50px] h-[50px] flex justify-center items-center mr-2 rounded-md">
                  <Mail width={25} className="text-gray-600" />
                </div>
                <div className=" bg-[#f5f5f5] w-[50px] h-[50px] flex justify-center items-center mr-2 rounded-md">
                  <MoreHorizontal width={25} className="text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full h-14 border-t-[1px] flex items-center">
            <div className=" flex items-center w-full justify-around">
              <span
                className="text-sm cursor-pointer font-semibold  
            after:content-[''] after:absolute after:bottom-0 after:left-6 after:h-[2px] after:bg-black"
              >
                About
              </span>
              <span className="text-sm cursor-pointer font-semibold  text-gray-400">
                Membership
              </span>
              <span className="text-sm cursor-pointer font-semibold  text-gray-400">
                Discussion
              </span>
              <span className="text-sm cursor-pointer font-semibold  text-gray-400">
                Video
              </span>
              <span className="text-sm cursor-pointer font-semibold  text-gray-400">
                Group
              </span>
              <span className="max-mobile:hidden text-sm cursor-pointer font-semibold  text-gray-400">
                Events
              </span>
              <span className="max-mobile:hidden text-sm cursor-pointer font-semibold  text-gray-400">
                Media
              </span>
            </div>
          </div>
        </div>
        {/* Profile body */}
        <div className="max-tablet:flex-col flex flex-row mt-4">
          {/* Sidebar */}
          <div className="basis-1/3 tablet:mr-4 mb-4">
            <div className="py-6 rounded-xl bg-white shadow-md mb-4">
              <div className="px-4">
                <p className="font-bold mb-3">About</p>
                <p className="text-xs font-medium text-text-disabled leading-5">
                  {thisProfileUser?.about ||
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  nulla dolor, ornare at commodo non, feugiat non nisi.
                  Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                  rhoncus`}
                </p>
              </div>

              <div className="border-t-[1px] w-full mt-6 mb-4" />

              <div className="flex items-center px-4 mb-4">
                <Lock width={25} color={"#b3bbc2"} className="mr-4" />
                <div>
                  <p className="font-bold text-sm">Private</p>
                  <p className="text-xs font-medium text-text-disabled leading-5">
                    Whats up, how are you?
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 mb-6">
                <Eye width={25} color={"#b3bbc2"} className="mr-4" />
                <div>
                  <p className="font-bold text-sm">Visble</p>
                  <p className="text-xs font-medium text-text-disabled leading-5">
                    Anyone can find you
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 mb-6">
                <MapPin width={25} color={"#b3bbc2"} className="mr-4" />
                <div>
                  <p className="font-bold text-sm">
                    {thisProfileUser?.city || "Flodia"},{" "}
                    {thisProfileUser?.country || "Austia"}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 mb-4">
                <Users width={25} color={"#b3bbc2"} className="mr-4" />
                <div>
                  <p className="font-bold text-sm">Group</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-md mb-4">
              <div className="flex justify-between mb-8">
                <p className="font-bold text-sm">Photos</p>
                <p className="font-semibold text-sm text-blue-600">See all</p>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-4">
                <img
                  src="http://sociala.uitheme.net/assets/images/e-1.jpg"
                  className="rounded-md"
                />
                <img
                  src="http://sociala.uitheme.net/assets/images/e-2.jpg"
                  className="rounded-md"
                />
                <img
                  src="http://sociala.uitheme.net/assets/images/e-3.jpg"
                  className="rounded-md"
                />
                <img
                  src="http://sociala.uitheme.net/assets/images/e-4.jpg"
                  className="rounded-md"
                />
                <img
                  src="http://sociala.uitheme.net/assets/images/e-5.jpg"
                  className="rounded-md"
                />
                <img
                  src="http://sociala.uitheme.net/assets/images/e-6.jpg"
                  className="rounded-md"
                />
              </div>
              <button className="flex justify-center items-center text-gray-600 w-full rounded-full bg-gray-200 py-3">
                <ExternalLink width={15} />
                <p className="font-semibold ml-2 text-sm">More</p>
              </button>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-md">
              <div className="flex justify-between mb-8">
                <p className="font-bold text-sm ">Events</p>
                <p className="font-semibold text-sm text-blue-600">See all</p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <span className="w-[63px] h-[71px] rounded-xl p-4 bg-[#FE9431]  text-white  flex items-center justify-center flex-col">
                    <p className="text-xl font-semibold">APR</p>
                    <p className="text-2xl font-bold">13</p>
                  </span>
                  <div className="ml-2">
                    <p className="font-bold text-[12px] ">
                      Meeting with clients
                    </p>
                    <p className="font-semibold text-[10px] text-text-disabled ">
                      41 madison ave, floor 24 new work, NY 10010
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <span className="w-[63px] h-[71px] rounded-xl p-4 bg-[#10d876]  text-white flex items-center justify-center flex-col">
                    <p className="text-xl font-semibold">APR</p>
                    <p className="text-2xl font-bold">30</p>
                  </span>
                  <div className="ml-2">
                    <p className="font-bold text-[12px] ">Developer Programe</p>
                    <p className="font-semibold text-[10px] text-text-disabled ">
                      41 madison ave, floor 24 new work, NY 10010
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="w-[63px] h-[71px] rounded-xl p-4 bg-[#10d876]  text-white flex items-center justify-center flex-col">
                    <p className="text-xl font-semibold">APR</p>
                    <p className="text-2xl font-bold">22</p>
                  </span>
                  <div className="ml-2">
                    <p className="font-bold text-[12px] ">Aniversary Event</p>
                    <p className="font-semibold text-[10px] text-text-disabled ">
                      41 madison ave, floor 24 new work, NY 10010
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* List posts */}
          <div className="basis-2/3">
            <ListPost userData={thisProfileUser} location={'profile'} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
