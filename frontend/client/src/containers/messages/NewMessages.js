import UserDetails from "components/posts/UserDetails";
import { useGetMessagesQuery } from "endpoints/rtkQuery/messageEnpoints";
import { useState } from "react";
import OldMessages from "./OldMessages";
import DisplayPfp from "components/Image/DisplayPfp";
const NewMessages = ({ messages, calc_room }) => {
  console.log(messages);
  if (messages.length > 0)
    return (
      <>
        {/* TODO set room name to target user and use a user id or token to seperate chats */}
        {messages.map((message) => (
          <div key={message.pk} className="d-flex justify-content-start">
            <div
              style={{ width: "fit-content" }}
              className="p-2 text-light pl-2"
            >
              <div className="d-flex align-items-center gap-1 ">
                <DisplayPfp
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "100%",
                  }}
                  pfp={process.env.REACT_APP_API_URL + message.user.pfp}
                />
                <div>
                  <div className="text-center text-light ">
                    {message.user.username}
                  </div>
                  <div className="">{message.msg}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
};
export default NewMessages;
