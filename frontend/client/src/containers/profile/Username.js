import user from "endpoints/auth/user";

const Username = ({ states, requested_user }) => {
  const onChange = (e) => {
    e.preventDefault();

    states.setFormData({
      ...states.formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const { editmode, response } = states.state;
  return (
    <>
      <div className="username fw-light text-light fw-bold align-self-center">
        {editmode ? (
          <div>
            <input
              autoComplete="off"
              name="username"
              defaultValue={requested_user.username}
              className="form-control text-light bg-black border-0  "
              onChange={onChange}
            />
            <div className="text-muted">{response}</div>
          </div>
        ) : (
          <div> {requested_user.username} </div>
        )}
      </div>
    </>
  );
};

export default Username;
