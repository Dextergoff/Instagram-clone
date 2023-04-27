const Description = ({states, formData, userobj}) => {
    const {newdescription} = states.formData
    const {editmode} = states.state
    const {description}= states.userState

    const onChange = (e) => {
        e.preventDefault();
        states.setFormData({
          ...states.formData,
          [e.target.name]: e.target.value,
          user: userobj.pk,
        });
      };
return(
    <div className="d-flex justify-content-center ">
        {editmode ? (
          <div className="w-25">
            <input
              autoComplete="off"
              name="newdescription"
              value={newdescription}
              placeholder={description+'...'}
              className=" text-center form-control bg-black border-0 "
              onChange={onChange}
            />
          </div>
        ) : (
          <div className="h6 align-self-center text-light fw-light">
            {description}
          </div>
        )}
      </div>
)
}

export default Description