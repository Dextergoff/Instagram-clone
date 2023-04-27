
const TitleInput = ({states}) => {
    const {title}=states.formData;
    const handleFormChange = (e) => {
      e.preventDefault();
      states.setFormData({
        ...states.formData,
        [e.target.name]: e.target.value,
      });
    };
      return(
        <div className="d-flex gap-2 mx-auto align-items-center mt-3">
                  <input
                    value={title}
                    name="title"
                    placeholder="Describe your post with text and #"
                    className=" form-control form-control-sm bg-black border-dark text-light shadow-none "
                    onChange={handleFormChange}
                  />
        </div>
      )
   
}

export default TitleInput