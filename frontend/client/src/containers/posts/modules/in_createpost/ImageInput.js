
const ImageInput = ({states}) => {

    const handleImageChange = (e) => {
        e.preventDefault();
        states.setFormData({ ...states.formData, image: e.target.files[0] });
        states.setFile(URL.createObjectURL(e.target.files[0]));
      };
      return(
        <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="d-none"
      />
      )
   
}

export default ImageInput