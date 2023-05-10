import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImagePreview = (props) => {
  const file = props.file;
  return (
    <>
      {file ? (
        <img className="" id="preview" src={file} />
      ) : (
        <label
          htmlFor="image"
          id="imagelabel"
          className="btn bg-dark border-0 p-4 btn-light d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon
            className="text-muted"
            icon="fa-regular fa-plus-square"
            size="2xl"
          />
        </label>
      )}
    </>
  );
};

export default ImagePreview;
