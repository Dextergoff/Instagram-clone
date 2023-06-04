import { useEditProfileMutation } from "endpoints/rtkQuery/profileEndpoints";
import { useState } from "react";
import { useEffect } from "react";
import InfoBar from "./InfoBar";
import EditButton from "./EditButton";
import Username from "./Username";
import Description from "./Description";
import SetPfp from "components/Image/SetPfp";
const ProfileHeader = ({ data, userobj }) => {
  const [formData, setFormData] = useState({
    user: userobj.pk,
    username: "",
    description: "",
    image: "",
  });
  const { user, username } = formData;
  const [file, setFile] = useState();
  const [state, setState] = useState({
    editmode: false,
    response: "",
  });

  const [userState, setUserState] = useState({
    username: userobj.username,
    description: userobj.description,
    pfp: process.env.REACT_APP_API_URL + userobj?.pfp,
  });

  const [editProfile, result] = useEditProfileMutation();

  useEffect(() => {
    result.data && setState({ ...state, response: result.data.response });
  }, [result]);

  useEffect(() => {
    username && editProfile({ user, username, save: false });
  }, [username]);
  useEffect(() => {
    setFormData({ ...formData, user: userobj.pk });
  }, [userobj]);

  return (
    <div>
      <div className="d-flex justify-content-end "></div>
      <div className="d-flex gap-3 justify-content-center ">
        <SetPfp
          states={{
            state,
            setState,
            formData,
            setFormData,
            userState,
            file,
            setFile,
          }}
          userobj={userobj}
        />

        <Username
          states={{ state, setState, formData, setFormData, userState }}
          userobj={userobj}
        />
        <EditButton
          states={{
            state,
            setState,
            formData,
            setFormData,
            userState,
            setUserState,
            file,
            setFile,
          }}
        />
      </div>

      <InfoBar data={data} />

      <Description
        states={{ state, setState, formData, setFormData, userState }}
        userobj={userobj}
      />
    </div>
  );
};
export default ProfileHeader;
