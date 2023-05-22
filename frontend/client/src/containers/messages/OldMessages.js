import UserDetails from "components/posts/UserDetails";
import { useGetMessagesQuery } from "endpoints/rtkQuery/messageEnpoints";
import { useState } from "react";
const OldMessages = ({ calc_room }) => {
  const [msgState, setMsgState] = useState({
    page: 1,
  });
  const { page } = msgState;
  const { data = [] } = useGetMessagesQuery({ calc_room, page });
  if (data.data)
    return (
      <>
        {/* TODO set room name to target user and use a user id or token to seperate chats */}
        <div
          style={{
            height: 500,
            maxHeight: 500,
            overflow: "auto",
            boxShadow: "none",
          }}
        >
          {data.data.map((message) => (
            <div key={message} className="d-flex justify-content-end">
              <div
                style={{ width: "fit-content" }}
                className="p-2 bg-primary rounded-pill pl-2"
              >
                <div className="">{message.message}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
};
export default OldMessages;
