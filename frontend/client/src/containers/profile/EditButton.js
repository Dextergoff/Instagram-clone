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

const EditButton = ({states, userobj} ) => {
  const { editmode, response } = states.state;
  const { user, newdescription, newusername, save } = states.formData;

  const enableEdit = () => {
    states.setState({
      ...states.state,
      editmode: editmode ? false : true,
      response: "",
    });
    resetFormData();
  };
  const [editProfile, result] = useEditProfileMutation();

  const usernametaken = Boolean(response != "username is taken")

  const resetFormData = () => {
    states.setFormData({
      ...states.formData,
      newdescription: '',
      newusername: '',
      user: null,
      response: "",
      save: false,
    });
  };
  
  const resetState = () => {
    states.setState({
      ...states.state,
      editmode: false,
      response: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile({ user, newusername, newdescription, save: true })
    .unwrap()
    .then(fulfilled => {
    resetState();
    resetFormData();
    states.setUserState({...states.userState, username: fulfilled.newusername, description: fulfilled.newdescription})
    })
    .catch(rejected => console.error(rejected))
  };
  return (
    <>
      {usernametaken && newusername?.length > 0 || usernametaken && newdescription?.length > 0 ?
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-sm btn-dark"
        >
          Save
        </button>
       : 
        <></>
      }
      <button onClick={enableEdit} className="btn btn-sm btn-dark">
        {states.state.editmode ? "Cancel" : <FontAwesomeIcon icon={faPencil} />}
      </button>
    </>
  );
};

export default EditButton;
