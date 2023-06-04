import ImagePreview from "components/inputs/ImagePreview";
import ImageInput from "components/inputs/ImageInput";
import DisplayPfp from "components/Image/DisplayPfp";
const SetPfp = ({ states, userobj }) => {
  const { file, setFile } = states;
  const { formData, setFormData } = states;
  const { state } = states;
  const { editmode } = state;

  return (
    <div>
      {editmode ? (
        <div>
          <ImagePreview
            style={{ width: "70px", height: "70px", borderRadius: "100%" }}
            file={file}
          />
          <ImageInput
            style={{ width: "70px", height: "70px", borderRadius: "100%" }}
            states={{ formData, setFormData, file, setFile }}
          />
        </div>
      ) : (
        <DisplayPfp
          style={{ width: "4rem  ", height: " 4rem", borderRadius: "100%" }}
          pfp={process.env.REACT_APP_API_URL + userobj.pfp}
        />
      )}
    </div>
  );
};

export default SetPfp;
