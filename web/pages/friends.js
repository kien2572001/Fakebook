import { useContext } from "react";

import { Filter, Search } from "react-feather";
import MainLayout from "~/components/layouts/MainLayout";
import AuthContext from "~/contexts/AuthContext";

export default function Index() {
  const user = useContext(AuthContext);

  return (
    <MainLayout>
      <div className="mx-32 w-4/5 mt-4">
        <div className="w-full p-6 flex justify-between h-[90px] bg-white items-center rounded-md">
          <p className="text-2xl font-bold">Members</p>
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

        <div className="grid grid-cols-4 gap-x-4 gap-y-3 mt-4">
          <div className=" h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full ">
              ADD FRIEND
            </button>
          </div>

          <div className=" h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>
          <div className=" h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>

          <div className=" h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>
          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>

          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>

          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full ">
              ADD FRIEND
            </button>
          </div>

          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>
          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>

          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>
          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>

          <div className="h-[225px] bg-white rounded flex flex-col justify-center items-center p-4 shadow">
            <img
              src="http://sociala.uitheme.net/assets/images/user-7.png"
              alt="image-profile"
              className="w-16 h-16 object-cover rounded-md"
            />
            <h3 className="text-sm mt-3">Victor Exrixon</h3>
            <p className="text-xs mb-4 text-text-disabled">@macale343</p>
            <button className="bg-[#10d876] text-white font-bold text-[10px] px-4 py-3 rounded-full shadow-md">
              ADD FRIEND
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
