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
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GalleryPostImage from "containers/modules/components/GalleryPostImage";
import BootstrapSpinner from "containers/modules/components/BootstrapSpinner";
import getQueryLength from "containers/modules/jobs/getQueryLength";
import UserExists from "containers/modules/jobs/verification/UserExists";
import ProfileHeader from "./ProfileHeader";
import PostGallery from "./PostGallery";
const ProfilePage = () => {

  const { userobj, loading } = useSelector((state) => state.user);

  const [state, setState] = useState({
    page: 1,
    pk: null,
    skip: true,
  });
  const { pk, page, skip } = state;

  const { data = [] } = useGetProfilePageQuery({ pk, page }, { skip: skip });

  useEffect(() => {
    if (UserExists({ userobj, loading })) {
      setState((state) => ({ ...state, pk: userobj.pk, skip: false }));
    }
  }, [loading, userobj]);

  if (getQueryLength(data) > 0) {
    return (
      <Layout>
        <>
          <ProfileHeader data={data} userobj={userobj} />
          <PostGallery data={data} state={{state, setState}}/>
        </>
      </Layout>
    );
  } else {
    return (
      <>
        <BootstrapSpinner />
      </>
    );
  }
};

export default ProfilePage;
