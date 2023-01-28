import { useContext } from "react";

import { Filter, Search, Video } from "react-feather";
import MainLayout from "~/components/layouts/MainLayout";
import AuthContext from "~/contexts/AuthContext";

export default function Index() {
  const user = useContext(AuthContext);

  return (
    <MainLayout>
      <div className="mx-32 w-4/5 mt-4">
        <div className="w-full p-6 flex justify-between h-[90px] bg-white items-center rounded-md">
          <p className="text-2xl font-bold">Group</p>
          <div className="flex h-full">
            <div className="flex bg-gray-100 text-gray-400 justify-center items-center rounded-md relative mr-2">
              <input
                type="text"
                placeholder="Search here."
                className="outline-none px-4 py-2 bg-gray-100 rounded text-sm pr-8"
              />
              <Search width={20} className="absolute right-2" />
            </div>
            <div className="flex justify-center items-center bg-gray-100 h-full py-2 px-3 rounded">
              <Filter width={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[190px] bg-white rounded overflow-hidden shadow-md">
            <img
              src="http://sociala.uitheme.net/assets/images/bb-16.png"
              alt="image-profile"
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 w-full relative ">
              <div className="flex justify-center items-center bg-white p-1 absolute -top-6 left-4 rounded-full">
                <img
                  src="http://sociala.uitheme.net/assets/images/user-12.png"
                  alt="image-profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-24 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Aliqa Macale</p>
                  <p className="text-[10px] text-gray-text">
                    support@gmail.com
                  </p>
                </div>
                <div className="flex mr-4">
                  <div className="w-[45px] h-[45px] flex justify-center items-center mr-4 rounded-[45px] bg-gradient-to-r from-[#05f] to-[#09f]">
                    <Video size="20" color="white" />
                  </div>
                  <button className="bg-[#05f] px-6 py-1 rounded-full text-white font-semibold text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
