
const ImageInput = ({states, style}) => {

    const handleImageChange = (e) => {
        e.preventDefault();
        states.setFormData({ ...states.formData, image: e.target.files[0] });
        states.setFile(URL.createObjectURL(e.target.files[0]));
      };
      return(
        <input
        style={style}
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="d-none"
      />
      )
   
}

export default ImageInput