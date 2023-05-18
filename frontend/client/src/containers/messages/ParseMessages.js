import UserDetails from "components/posts/UserDetails";

const ParseMessages = ({ messages, target_user }) => {
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
        {messages.map((message) => (
          <div key={message} className="d-flex justify-content-end">
            <div
              style={{ width: "fit-content" }}
              className="p-2 bg-primary rounded-pill pl-2"
            >
              <div className="">
                {message.msg} {target_user.username}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ParseMessages;
