const Description = ({ states, formData, requested_user }) => {
  const { editmode } = states.state;

  const onChange = (e) => {
    e.preventDefault();
    states.setFormData({
      ...states.formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="d-flex justify-content-center mb-2 ">
      {editmode ? (
        <div className="w-25">
          <input
            autoComplete="off"
            name="description"
            defaultValue={requested_user.description}
            className=" text-center text-light form-control bg-black border-0 "
            onChange={onChange}
          />
        </div>
      ) : (
        <div className="h6 align-self-center text-light fw-light">
          {requested_user.description}
        </div>
      )}
    </div>
  );
};

export default Description;
