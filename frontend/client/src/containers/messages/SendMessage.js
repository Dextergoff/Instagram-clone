import { useSelector } from "react-redux";
import { useState } from "react";
const SendMessage = ({ client, target_user, userobj }) => {
  const [formState, setFormState] = useState({
    value: "",
    name: "",
  });
  const { value } = formState;

  const handleSubmit = (e) => {
    if (value.length > 0) {
      client.send(
        JSON.stringify({
          type: "message",
          text: value,
          sender: userobj?.pk,
          receiver: target_user?.pk,
        })
      );
      setFormState({ ...formState, value: "" });
    }
    e.preventDefault();
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="d-flex border border-secondary rounded-5 p-2">
          <input
            onChange={(e) => {
              setFormState({ ...formState, value: e.target.value });
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
