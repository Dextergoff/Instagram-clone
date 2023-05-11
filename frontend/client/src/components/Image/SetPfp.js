import ImagePreview from "components/inputs/ImagePreview";
import ImageInput from "components/inputs/ImageInput";
import DisplayPfp from "components/Image/DisplayPfp";
const SetPfp = ({ states }) => {
  const { file, setFile } = states;
  const { formData, setFormData } = states;
  const { userState } = states;
  const { state } = states;
  const { editmode } = state;
  const { pfp } = userState;

  return (
    <div>
      {editmode ? (
        <div>
          <ImagePreview file={file} />
          <ImageInput states={{ formData, setFormData, file, setFile }} />
        </div>
      ) : (
        <DisplayPfp
          style={{ width: "7rem  ", height: " 7rem", borderRadius: "100%" }}
          pfp={pfp}
        />
        // not working since display pfp has env url added to it the pfp shown here is under a diffrent url so it doesnt work for it to work it needs to be alone
      )}
    </div>
  );
};

export default SetPfp;
