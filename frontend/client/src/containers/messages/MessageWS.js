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
  // TODO but this in a try catch nad navigate to login on catch

  const { userobj } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const { target_user } = location.state;

  const [state, setState] = useState({
    page: 1,
    connected: false,
  });

  const calc_room = target_user?.pk * 3 + userobj?.pk * 3;

  const client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + calc_room);

  client.onmessage = (message) => {
    HandleServedData({
      message,
      state,
      dispatch,
      calc_room,
    });
  };
  // websocket sending message three times?!

  // client.onmessage = function (e) {
  //   if (typeof e.data === "string") {
  //     console.log("Received: '" + e.data + "'");
  //   }
  // };

  if (userobj) {
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
            <Messages calc_room={calc_room} />
            <SendMessage userobj={userobj} client={client} />
          </div>
        </div>
      </Layout>
    );
  }
};

export default MessageWS;
