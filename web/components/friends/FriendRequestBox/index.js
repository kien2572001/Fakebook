import { v4 as uuidv4 } from "uuid";
import { Result, Button } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
export default function FriendRequestBox({
  data,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
}) {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex justify-center h-screen absolute right-4">
      <div className="relative my-[90px]">
        <div
          className="absolute top-[425px] right-[-20px] mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
          style={{ width: "20rem" }}
        >
          <div
            className={`py-2 max-h-[341px] ${
              data && data.length > 0
                ? "overflow-x-hidden overflow-y-auto"
                : "overflow-hidden"
            } cursor-pointer`}
          >
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                let whomSendRequest = null;
                if (user.id === item.source_id) whomSendRequest = item.target;
                else whomSendRequest = item.source;
                console.log("whomSendRequest", whomSendRequest);
                return (
                  <div
                    href="#"
                    className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                    key={uuidv4()}
                  >
                    <img
                      className="h-20 min-w-20 rounded-full object-cover mx-1"
                      src={whomSendRequest.avatar}
                      alt="avatar"
                    />
                    <div className="text-gray-600 text-sm mx-2">
                      <span className="font-bold mb-1" href="#">
                        {whomSendRequest.first_name} {whomSendRequest.last_name}
                      </span>{" "}
                      <div>
                        <Button
                          type="primary"
                          className="mr-2"
                          onClick={() =>
                            handleAcceptFriendRequest(whomSendRequest.id)
                          }
                          style={{
                            backgroundColor: "#1890ff",
                            "$:hover": {
                              backgroundColor: "#40a9ff",
                            },
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={() =>
                            handleRejectFriendRequest(whomSendRequest.id)
                          }
                        >
                          Reject
                        </Button>
                      </div>
                      {moment(item.created_at).fromNow()}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            See all notifications
          </div> */}
        </div>
      </div>
    </div>
  );
}
