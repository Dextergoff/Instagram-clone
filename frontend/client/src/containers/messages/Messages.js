import { w3cwebsocket } from "websocket";
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import onSubmit from "components/forms/onSubmit";
import SendMessage from "./SendMessage";
import ParseMessages from "./ParseMessages";
import Layout from "Layout/Layout";
const Messages = () => {
  const [state, setState] = useState({
    filledForm: false,
    messages: [],
    value: "",
    name: "",
    room: "test",
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
            { msg: servedData.text, name: servedData.sender },
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
            className="p-5 "
          >
            <ParseMessages room={room} messages={messages} />
            <SendMessage states={{ state, setState }} client={client} />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Messages;
