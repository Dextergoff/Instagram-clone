import { useEffect, useState } from "react";
import Layout from "Layout/Layout";
import { useGetChatRoomQuery } from "endpoints/rtkQuery/messageEnpoints";
import UserDetails from "containers/posts/UserDetails";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ChatRooms = () => {
  const { userobj } = useSelector((state) => state.user);
  const [state, setState] = useState({
    skip: true,
  });
  const { skip } = state;
  const { data } = useGetChatRoomQuery(userobj?.pk, { skip: skip });
  useEffect(() => {
    if (userobj?.pk) {
      setState({ skip: false });
    }
  }, [userobj]);
  // TODO make this look instagrams intial inbox page
  return (
    <Layout>
      <div>
        {data?.data.map((room) => (
          <div className="p-3">
            <Link
              className="comments-link text-muted fw-light text-decoration-none"
              to={`/dm/u`}
              state={{
                target_user: room.receiver,
              }}
            >
              <div className="">
                <UserDetails
                  user={room.receiver}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "100%",
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default ChatRooms;
