import { v4 as uuidv4 } from "uuid";
import { Result } from "antd";
import moment from "moment";
export default function Notification({ data }) {
  return (
    <div className="flex justify-center h-screen absolute right-4">
      <div className="relative my-[90px]">
        {/* <button className="relative z-10 block rounded-md bg-white p-2 focus:outline-none">
            <svg
              className="h-5 w-5 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button> */}

        {/* <div className="fixed inset-0 h-full w-full z-10"></div> */}

        <div
          className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
          style={{ width: "20rem" }}
        >
          <div
            className={`py-2 max-h-[341px] ${
              data && data.length > 0 ? "overflow-x-hidden overflow-y-auto" : "overflow-hidden"
            } cursor-pointer`}
          >
            {data && data.length === 0 && (
              <img
                src="https://fakebook-kien2572001.s3.ap-southeast-1.amazonaws.com/images/default/no-notification.png"
                alt="no-notification"
                className="w-full h-full"
              />
            )}
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    href="#"
                    className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                    key={uuidv4()}
                  >
                    <img
                      className="h-8 min-w-8 rounded-full object-cover mx-1"
                      src={item.notification?.user_src.avatar}
                      alt="avatar"
                    />
                    <p className="text-gray-600 text-sm mx-2">
                      <span className="font-bold" href="#">
                        {item.notification.user_src.name}
                      </span>{" "}
                      {item.notification.signal}{" "}
                      {/* <span className="font-bold text-blue-500" href="#">
                        Upload Image
                      </span>{" "} */}
                      {/* artical . 2m */}
                      {moment(item.notification.created_at).fromNow()}
                    </p>
                  </div>
                );
              })}
            {/* <div
                href="#"
                className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                  alt="avatar"
                />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold" href="#">
                    Sara Salah
                  </span>{" "}
                  replied on the{" "}
                  <span className="font-bold text-blue-500" href="#">
                    Upload Image
                  </span>{" "}
                  artical . 2m
                </p>
              </div>
              <div
                href="#"
                className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt="avatar"
                />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold" href="#">
                    Slick Net
                  </span>{" "}
                  start following you . 45m
                </p>
              </div>
              <div
                href="#"
                className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                  alt="avatar"
                />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold" href="#">
                    Jane Doe
                  </span>{" "}
                  Like Your reply on{" "}
                  <span className="font-bold text-blue-500" href="#">
                    Test with TDD
                  </span>{" "}
                  artical . 1h
                </p>
              </div>
              <div
                href="#"
                className="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                  alt="avatar"
                />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold" href="#">
                    Abigail Bennett
                  </span>{" "}
                  start following you . 3h
                </p>
              </div> */}
          </div>
          <div
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            See all notifications
          </div>
        </div>
      </div>
    </div>
  );
}
