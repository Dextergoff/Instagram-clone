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
const MessageWS = () => {
  const { userobj } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const { target_user } = location.state;

  const calc_room = target_user?.pk * 3 + userobj?.pk * 3;

  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;

  // TODO make the sidebar for users others chats display what user your talking too on both sides of the chat, scroll overflow

  const client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + calc_room);

  useEffect(() => {
    client.onmessage = (message) => {
      const jsonMessage = JSON.parse(message.data);
      storeMessage({
        page,
        jsonMessage,
        dispatch,
        calc_room,
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
          <Sidebar
            style={{
              maxHeight: "95vh",
              width: "40vh",
            }}
          />
        </div>
        <div>
          <UserDetails user={target_user} />
          <Messages states={{ state, setState }} calc_room={calc_room} />
          <SendMessage
            client={client}
            userobj={userobj}
            target_user={target_user}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MessageWS;
