const ParseMessages = ({ messages, room }) => {
  return (
    <>
      {/* TODO set room name to target user and use a user id or token to seperate chats */}
      <div className="text-light">Room Name: {room}</div>
      <div
        style={{
          height: 500,
          maxHeight: 500,
          overflow: "auto",
          boxShadow: "none",
        }}
      >
        {messages.map((message) => (
          <div key={message} className="">
            <div className="text-light">
              {message.sender}:{message.msg}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ParseMessages;
