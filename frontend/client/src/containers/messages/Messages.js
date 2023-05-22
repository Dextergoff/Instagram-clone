import { w3cwebsocket } from "websocket";
import { useState } from "react";
import { useEffect } from "react";
import SendMessage from "./SendMessage";
import ParseMessages from "./ParseMessages";
import Layout from "Layout/Layout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "Navbar/Navbar";
import { useGetMessagesQuery } from "endpoints/rtkQuery/messageEnpoints";
import { faL } from "@fortawesome/free-solid-svg-icons";
//TODO create a endpoint for retrieving previous messages when user connects to ws
const Messages = () => {
  const location = useLocation();
  const { target_user } = location.state;
  const { userobj } = useSelector((state) => state.user);

  let client;
  let servedData;
  let calc_room;

  const [state, setState] = useState({
    filledForm: false,
    messages: [],
    value: "",
    name: "",
    receiver: target_user,
  });
  const { messages, receiver, skip } = state;

  calc_room = receiver?.pk * 3 + userobj?.pk * 3;

  useEffect(() => {
    if (userobj) {
      client.onmessage = (message) => {
        if (client.readyState === client.OPEN) {
          servedData = JSON.parse(message.data);
          setState({
            ...state,
            messages: [
              ...messages,
              { msg: servedData.text, sender: servedData.sender },
            ],
          });
        }
      };
    }
  }, []);

  if (userobj) {
    client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + calc_room);
    return (
      <Layout>
        <div className="d-flex flex-column align-items-center ">
          <div
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
            }}
            className=" "
          >
            <ParseMessages
              states={{ state, setState }}
              target_user={target_user}
              calc_room={calc_room}
            />
            <SendMessage states={{ state, setState }} client={client} />
          </div>
        </div>
        <Navbar />
      </Layout>
    );
  }
};

export default Messages;
