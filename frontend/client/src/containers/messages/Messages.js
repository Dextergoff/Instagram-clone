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
import Navbar from "Navbar/Navbar";
import { logDOM } from "@testing-library/react";
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
    receiver_name: target_user.username,
  });
  const { messages, receiver_name } = state;

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

  if (userobj) {
    client = new w3cwebsocket(
      "ws://127.0.0.1:8000/ws/" + receiver_name + "/" + userobj?.username
    );

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
              receiver_name={receiver_name}
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
