import { w3cwebsocket } from "websocket";
import { useState } from "react";
import { useEffect } from "react";
import SendMessage from "./SendMessage";
import Layout from "Layout/Layout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserDetails from "containers/posts/UserDetails";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import storeMessage from "./storeMessage";
import ChatRooms from "./ChatRooms";
const MessageWS = () => {
  const { userobj } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const { target_user } = location.state;

  const room_name = target_user?.pk * 3 + userobj?.pk * 3;

  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;

  // TODO make the sidebar for users others chats display what user your talking too on both sides of the chat, scroll overflow

  const client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + room_name);

  useEffect(() => {
    client.onmessage = (message) => {
      const jsonMessage = JSON.parse(message.data);
      storeMessage({
        page,
        jsonMessage,
        dispatch,
        room_name,
      });
    };
    return () => {
      client.close();
    };
  });

  return (
    <Layout>
      <div className="d-flex flex-row">
        <div>
          <ChatRooms />
        </div>

        <div
          style={{
            height: "100vh",
            width: "100vw",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          className="d-flex flex-column"
        >
          <div
            style={{
              borderBottomStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <UserDetails
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "100%",
              }}
              user={target_user}
            />
          </div>
          <Messages
            states={{ state, setState }}
            room_name={room_name}
            userobj={userobj}
          />
          <div class="mt-auto p-2">
            <SendMessage
              client={client}
              userobj={userobj}
              target_user={target_user}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessageWS;
