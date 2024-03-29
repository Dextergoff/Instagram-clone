import { useEditProfileMutation } from "endpoints/rtkQuery/profileEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = ({ states }) => {
  const { formData, setFormData } = states;
  const { state, setState } = states;
  const { userState, setUserState } = states;

  const { setFile } = states;
  const { editmode, response } = state;
  const { description, username } = formData;
  const [editProfile] = useEditProfileMutation();

  const enableEdit = () => {
    setState({
      ...state,
      editmode: editmode ? false : true,
      response: "",
    });
    resetFormData();
    resetFile();
  };
  // TODO items not being updated properly after submit
  const usernametaken = Boolean(response != "username is taken");

  // useEffect(() => {

  // }, [username, description, states.file]);

  const resetFormData = () => {
    setFormData({
      ...formData,
      newdescription: "",
      username: "",
      response: "",
      image: "",
      save: false,
    });
  };

  const form_data = () => {
    let form_data = new FormData();
    for (let i in formData) {
      form_data.append(i, formData[i]);
    }
    return form_data;
  };

  const resetState = () => {
    setState({
      ...state,
      editmode: false,
      response: "",
    });
  };
  const resetFile = () => {
    setFile();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(form_data())
      .unwrap()
      .then((fulfilled) => {
        setUserState({
          ...userState,
          username: fulfilled.username,
          description: fulfilled.description,
          pfp: states.file || userState.pfp,
        });
      })
      .catch((rejected) => console.error(rejected));

    resetState();
    resetFormData();
    resetFile();
  };
  return (
    <>
      {states.state.editmode ? (
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-sm btn-black text-light"
        >
          Save
        </button>
      ) : (
        <></>
      )}
      <button onClick={enableEdit} className="btn btn-sm btn-black text-light">
        {states.state.editmode ? (
          "Cancel"
        ) : (
          <FontAwesomeIcon icon="fa-regular fa-edit" />
        )}
      </button>
    </>
  );
};

export default EditButton;
