import { w3cwebsocket } from "websocket";
import { useState } from "react";
import { useEffect } from "react";
import SendMessage from "./SendMessage";
import Layout from "Layout/Layout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserDetails from "containers/posts/UserDetails";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import storeMessage from "./storeMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MessageWS = (props) => {
  const dispatch = useDispatch();
  const { userobj } = useSelector((state) => state.user);

  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;

  const target_user = props.target_user || null;
  const room_name = target_user?.pk * 3 + userobj?.pk * 3;

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

  if (target_user) {
    return (
      <Layout>
        <div className="">
          <div
            style={{
              height: "100vh",
            }}
            className="d-flex flex-column "
          >
            <div className="d-flex flex-row align-self-center mb-3 mt-2">
              <UserDetails
                style={{
                  width: "2rem",
                  height: "2rem",
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
  } else {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
        className=""
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
          className="text-light d-flex flex-column text-center"
        >
          <div className="mb-2">
            <FontAwesomeIcon
              style={{
                fontSize: "5rem",
              }}
              icon="fa-regular fa-message"
            />
          </div>

          <div className="mb-2">Your messages</div>
          <div
            style={{
              fontSize: "0.7rem",
            }}
            className="text-muted"
          >
            Send private messages to a friend or group
          </div>
        </div>
      </div>
    );
  }
};

export default MessageWS;
