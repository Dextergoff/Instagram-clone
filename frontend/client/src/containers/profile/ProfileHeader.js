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
import FollowBtn from "./FollowBtn";

const ProfileHeader = ({ data, requested_user, userobj, location, page }) => {
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
        <FollowBtn
          is_following={data.is_following}
          requested_user={requested_user}
          userobj={userobj}
          page={page}
        />

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

      <InfoBar requested_user={requested_user} location={location} />
      {/* TODO update follower count and is_following by returning that data in manage followers response  */}

      <Description
        states={{ state, setState, formData, setFormData, userState }}
        requested_user={requested_user}
      />
    </div>
  );
};
export default ProfileHeader;
