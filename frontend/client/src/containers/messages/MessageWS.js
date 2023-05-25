import { w3cwebsocket } from "websocket";
import { useState } from "react";
import { useEffect } from "react";
import SendMessage from "./SendMessage";
import Layout from "Layout/Layout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserDetails from "components/posts/UserDetails";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import HandleServedData from "./HandleServedData";
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
  // TODO clean up html, increase amount of messages per page, make the sidebar for users others chats display what user your talking too on both sides of the chat
  const client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + calc_room);
  useEffect(() => {
    client.onmessage = (message) => {
      HandleServedData({
        page,
        message,
        dispatch,
        calc_room,
      });
      console.log(message);
    };
  }, [dispatch, calc_room]);

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
          <SendMessage client={client} />
        </div>
      </div>
    </Layout>
  );
};

export default MessageWS;
