import { useSelector } from "react-redux";
import { useGetProfilePageQuery } from "endpoints/rtkQuery/profileEndpoints";
import Layout from "Layout/Layout";
import { useState } from "react";
import "./css/ProfilePage.css";
import { useEffect } from "react";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import getQueryLength from "components/jobs/getQueryLength";
import UserExists from "components/jobs/verification/UserExists";
import ProfileHeader from "components/profile/ProfileHeader";
import PostGallery from "components/profile/PostGallery";
import "./css/imagelabel.css";
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
          <PostGallery data={data} state={{ state, setState }} />
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
// TODO make grid smaller images are too big maybe make header larger too increase spacing between images and responsiveness

export default ProfilePage;
