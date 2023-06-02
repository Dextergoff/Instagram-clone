import { useEffect, useState } from "react";
import Layout from "Layout/Layout";
import { useGetChatRoomQuery } from "endpoints/rtkQuery/messageEnpoints";
import UserDetails from "containers/posts/UserDetails";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MessageWS from "./MessageWS";
import AwaitData from "components/loading/AwaitData";
const ChatRooms = () => {
  const location = useLocation();
  const { userobj } = useSelector((state) => state.user);

  const [state, setState] = useState({
    skip: true,
    target_user: null,
  });
  const { target_user, skip } = state;

  const { data } = useGetChatRoomQuery(userobj?.pk, { skip: skip });

  const handleClick = (target_user) => {
    setState({ ...state, target_user: target_user });
  };

  useEffect(() => {
    if (userobj?.pk) {
      setState({ ...state, skip: false });
    }
  }, [userobj]);

  useEffect(() => {
    try {
      setState({ ...state, target_user: location.state.target_user });
    } catch (error) {}
  }, [location.state]);

  return (
    <AwaitData data={data}>
      <Layout data={data}>
        <div className="d-flex flex-row">
          <div
            style={{
              height: "100vh",
              flexGrow: 1,
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
              }}
              className="p-2 text-light"
            >
              {userobj?.username}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
              }}
              className="p-2 text-light"
            >
              Messages
            </div>
            {data?.data.map((room) => (
              <div className="p-2">
                <button
                  onClick={() => handleClick(room.receiver)}
                  className="comments-link text-muted bg-black border-0 fw-light text-decoration-none"
                  to={`/dm/u`}
                  state={{
                    target_user: room.receiver,
                  }}
                >
                  <div
                    style={{
                      width: "13vw",
                    }}
                  >
                    <UserDetails
                      user={room.receiver}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "100%",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.8rem",
                      }}
                      className="d-flex align-self-start"
                    >
                      last message test • 1h ago
                    </div>
                    {/* TODO implement last messages and truncate to "..." after a few chars */}
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div
            style={{
              height: "100vh",
              width: "80vw",
              flexGrow: 2,
            }}
          >
            <MessageWS target_user={target_user} />
          </div>
        </div>
      </Layout>
    </AwaitData>
  );
};
export default ChatRooms;
