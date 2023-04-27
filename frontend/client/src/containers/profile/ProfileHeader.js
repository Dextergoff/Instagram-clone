import { useSelector } from "react-redux";
import {
  useGetProfilePageQuery,
  useEditProfileMutation,
} from "endpoints/rtkQuery/profileEndpoints";
import Layout from "modules/Layout";
import { useState } from "react";
import "./css/ProfilePage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GalleryPostImage from "containers/modules/components/GalleryPostImage";
import BootstrapSpinner from "containers/modules/components/BootstrapSpinner";
import getQueryLength from "containers/modules/jobs/getQueryLength";
import UserExists from "containers/modules/jobs/verification/UserExists";
import InfoBar from "./InfoBar";
import EditButton from "./EditButton";
import Username from "./Username";
import Description from "./Description";
import Pfp from "./Pfp";
const ProfileHeader = ({ data, userobj}) => {

  const [formData, setFormData] = useState({
    user: null,
    newusername: '',
    newdescription: '',
    save:false,
  });
  const { user, newusername } = formData;

  const [state, setState] = useState({
    editmode: false,
    response: "",
  });

  const [userState, setUserState] = useState({
    username: userobj.username,
    description: userobj.description,
    pfp:userobj.pfp,

  });

  const [editProfile, result] = useEditProfileMutation();

  useEffect(() => {
    result.data &&
        setState({ ...state, response: result.data.response });
  }, [result]);


  useEffect(() => {
    newusername &&
      editProfile({user, newusername, save:false})
  }, [newusername]);

  return (
    <>
    <div className="d-flex justify-content-end ">
    <EditButton states={{state, setState, formData, setFormData,userState,setUserState} } userobj = {userobj} />
    </div>
      <div className="d-flex gap-3 justify-content-center ">
         <Pfp states={{state, setState, formData, setFormData, userState}} userobj = {userobj} />
        <Username states={{state, setState, formData, setFormData, userState}} userobj = {userobj} />
      </div>
      

      <InfoBar data={data}/>

     <Description states={{state, setState, formData, setFormData, userState}} userobj = {userobj}/>
     </>
  );
};
export default ProfileHeader;
