import { w3cwebsocket } from "websocket";
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SendMessage from "./SendMessage";
import ParseMessages from "./ParseMessages";
import Layout from "Layout/Layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Messages = () => {
  const location = useLocation();
  const { target_user } = location.state;
  // TODO add pfp to room name
  const [state, setState] = useState({
    filledForm: false,
    messages: [],
    value: "",
    name: "",
    room: target_user.username,
  });
  const { messages, room } = state;

  const client = new w3cwebsocket("ws://127.0.0.1:8000/ws/" + room + "/");

  useEffect(() => {
    client.onmessage = (message) => {
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
    };
  }, []);

  return (
    <Layout>
      <>
        <div className="d-flex flex-column align-items-center ">
          <div
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
            }}
            className=" "
          >
            <ParseMessages
              room={room}
              messages={messages}
              target_user={target_user}
            />
            <SendMessage states={{ state, setState }} client={client} />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Messages;
