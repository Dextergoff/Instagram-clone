import UserDetails from "components/posts/UserDetails";
import { useGetMessagesQuery } from "endpoints/rtkQuery/messageEnpoints";
import { useState } from "react";
import OldMessages from "./OldMessages";
const ParseMessages = ({ states, target_user, calc_room }) => {
  const { messages } = states.state;
  return (
    <>
      {/* TODO set room name to target user and use a user id or token to seperate chats */}
      <UserDetails user={target_user} />
      <div
        style={{
          height: 500,
          maxHeight: 500,
          overflow: "auto",
          boxShadow: "none",
        }}
      >
        <OldMessages calc_room={calc_room} />
        {messages.map((message) => (
          <div key={message} className="d-flex justify-content-end">
            <div
              style={{ width: "fit-content" }}
              className="p-2 bg-primary rounded-pill pl-2"
            >
              <div className="">{message.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ParseMessages;
