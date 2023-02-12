import { useContext, useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { Image } from "antd";

export default function About({ thisProfileUser }) {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetch6Photos = async () => {
      const res = await axios.get(`/users/${thisProfileUser.id}/6photos`);
      if (res.status === 200) {
        setPhotos(res.data.data);
      }
    };
    fetch6Photos();
  }, []);
  return (
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
            <Image.PreviewGroup>
              {
                // Render 6 photos
                photos?.map((photo, index) => {
                  return (
                    <Image
                      key={uuidv4()}
                      src={photo.image}
                      alt=""
                      className="w-full h-[100px] rounded-md"
                    />
                  );
                })
              }
            </Image.PreviewGroup>
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
                <p className="font-bold text-[12px] ">Meeting with clients</p>
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
        <ListPost userData={thisProfileUser} location={"profile"} />
      </div>
    </div>
  );
}
