import { useSelector } from "react-redux";
const SendMessage = ({ states, client }) => {
  const setState = states.setState;
  const state = states.state;
  const { value, name } = state;
  const { userobj } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    if (value.length > 0) {
      client.send(
        JSON.stringify({
          type: "message",
          text: value,
          sender: userobj?.username,
        })
      );
      setState({ ...state, value: "" });
    }

    e.preventDefault();
  };
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            onChange={(e) => {
              setState({ ...state, value: e.target.value });
            }}
            id="outlined-helperText"
            label="Write text"
            placeholder="Send Message"
            style={{ boxShadow: "none", padding: 0 }}
            autoComplete="off"
            className="form-control border-0 fw-light bg-black text-light"
            type="text"
            name="body"
            value={value}
          />
          <button type="submit" className={`border-0 bg-black text-primary`}>
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default SendMessage;
