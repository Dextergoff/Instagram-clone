import {
  useEditProfileMutation,
} from "endpoints/rtkQuery/profileEndpoints";
import { useState } from "react";
import { useEffect } from "react";
import InfoBar from "./InfoBar";
import EditButton from "./EditButton";
import Username from "./Username";
import Description from "./Description";
import SetPfp from "../Image/SetPfp";
const ProfileHeader = ({ data, userobj}) => {

  const [formData, setFormData] = useState({
    user: userobj.pk,
    username: '',
    description: '',
    image: '',
  });
  const { user, username } = formData;
  const [file, setFile] = useState();
  const [state, setState] = useState({
    editmode: false,
    response: "",
  });
  const {editmode} = state;
  const [userState, setUserState] = useState({
    username: userobj.username,
    description: userobj.description,
    pfp:process.env.REACT_APP_API_URL + userobj?.pfp,

  });

  const [editProfile, result] = useEditProfileMutation();

  useEffect(() => {
    result.data &&
        setState({ ...state, response: result.data.response });
  }, [result]);


  useEffect(() => {
    username &&
      editProfile({user, username, save:false})
  }, [username]);

  return (
    <>
    <div className="d-flex justify-content-end ">
    <EditButton states={{state, setState, formData, setFormData,userState,setUserState, file, setFile} } userobj = {userobj} />
    </div>
      <div className="d-flex gap-3 justify-content-center ">
         <SetPfp states={{state, setState, formData, setFormData, userState, file, setFile}}/>
        <Username states={{state, setState, formData, setFormData, userState}} userobj = {userobj} />
      </div>
      

      <InfoBar data={data}/>

     <Description states={{state, setState, formData, setFormData, userState}} userobj = {userobj}/>
     </>
  );
};
export default ProfileHeader;
