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
//TODO create a endpoint for retrieving previous messages when user connects to ws
const Messages = () => {
  let client;

  const location = useLocation();
  const { target_user } = location.state;

  const { userobj } = useSelector((state) => state.user);

  const [state, setState] = useState({
    filledForm: false,
    messages: [],
    value: "",
    name: "",
    receiver: target_user,
    skip: true,
  });
  const { messages, receiver, skip } = state;
  const { old_messages } = useGetMessagesQuery(
    {
      ...receiver.pk,
      ...userobj?.pk,
    },
    { skip: skip }
  );
  useEffect(() => {
    if (userobj) {
      client.onmessage = (message) => {
        if (client.readyState === client.OPEN) {
          const servedData = JSON.parse(message.data);
          if (servedData) {
            setState({
              ...state,
              messages: [
                ...messages,
                { msg: servedData.text, sender: servedData.sender },
              ],
            });
          }
        }
      };
    }
  }, []);
  useEffect(() => {
    if (userobj) {
      setState({
        ...state,
        skip: false,
      });
    }
  }, []);
  if (userobj) {
    const room_name = receiver.pk * 3 + userobj?.pk * 3;

    client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + room_name);

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
              receiver={receiver.username}
              messages={messages}
              target_user={target_user}
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
