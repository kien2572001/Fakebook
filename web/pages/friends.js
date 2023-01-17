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
          <div className="flex">
            <div className="flex bg-gray-100 text-gray-400 justify-center items-center rounded-md relative mr-2">
              <input
                type="text"
                placeholder="Search here."
                className="outline-none px-4 py-2 bg-gray-100 rounded"
              />
              <Search width={20} className="absolute right-2" />
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <Filter width={20} className="bg-gray-100 p-2" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
