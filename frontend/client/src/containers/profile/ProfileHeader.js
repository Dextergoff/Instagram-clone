import { useEditProfileMutation } from "endpoints/rtkQuery/profileEndpoints";
import { useState } from "react";
import { useEffect } from "react";
import InfoBar from "./InfoBar";
import EditButton from "./EditButton";
import Username from "./Username";
import Description from "./Description";
import SetPfp from "components/Image/SetPfp";
import { useSelector } from "react-redux";
import { useManageFollowersMutation } from "endpoints/rtkQuery/profileEndpoints";
import MessageBtn from "components/buttons/MessageBtn";

const ProfileHeader = ({ data, requested_user }) => {
  const { userobj } = useSelector((state) => state.user);
  const pk = userobj.pk;
  const requested_user_pk = requested_user.pk;
  const [manage_followers] = useManageFollowersMutation();
  const is_self = Boolean(userobj.pk == requested_user.pk);
  const [formData, setFormData] = useState({
    user: requested_user.pk,
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
    username: requested_user.username,
    description: requested_user.description,
    pfp: process.env.REACT_APP_API_URL + requested_user.pfp,
  });

  const [editProfile, result] = useEditProfileMutation();

  useEffect(() => {
    if (result.data) {
      setState({ ...state, response: result.data.response });
    }
  }, [result]);

  useEffect(() => {
    setState({ ...state, response: "", editmode: false });
  }, [requested_user]);

  useEffect(() => {
    username && editProfile({ user, username, save: false });
  }, [username]);

  useEffect(() => {
    setFormData({ ...formData, user: requested_user.pk });
  }, [requested_user]);

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
          requested_user={requested_user}
        />
        <Username
          states={{ state, setState, formData, setFormData, userState }}
          requested_user={requested_user}
        />

        {!is_self ? (
          <div className="d-flex flex-row gap-3">
            <div
              onClick={() => manage_followers({ pk, requested_user_pk })}
              className="align-self-center btn btn-sm btn-primary"
            >
              Follow
            </div>

            <div className="align-self-center">
              <MessageBtn target={requested_user} size="sm" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {is_self ? (
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
        ) : (
          <></>
        )}
      </div>

      <InfoBar data={data} />

      <Description
        states={{ state, setState, formData, setFormData, userState }}
        requested_user={requested_user}
      />
    </div>
  );
};
export default ProfileHeader;
