import ImagePreview from "components/inputs/ImagePreview";
import ImageInput from "components/inputs/ImageInput";
const Pfp = ({ states }) => {
  const {file, setFile} = states
  const {formData, setFormData} = states
  const {userState} = states
  const {state} = states

  const { newpfp } = formData;
  const { editmode } = state;
  const { pfp } = userState;

  
  return (
    <div>
      {editmode ? (
        <div>
            <ImagePreview file={file}/>
            <ImageInput states={{formData, setFormData, file, setFile}} />
        </div>
      ) : (
        <div className="h6 align-self-center text-light fw-light">
          <img
            style={{ width: "70px", height: "70px", borderRadius: "100%" }}
            src={pfp}
          />
        </div>
      )}
    </div>
  );
};

export default Pfp;
