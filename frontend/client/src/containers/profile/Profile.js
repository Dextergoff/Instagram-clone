import { useSelector } from "react-redux";
import { useGetProfilePageQuery } from "endpoints/rtkQuery/profileEndpoints";
import Layout from "Layout/Layout";
import { useState } from "react";
import { useEffect } from "react";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import getQueryLength from "components/jobs/getQueryLength";
import UserExists from "components/jobs/verification/UserExists";
import ProfileHeader from "components/profile/ProfileHeader";
import PostGallery from "components/profile/PostGallery";
const Profile = () => {
  const { userobj, loading } = useSelector((state) => state.user);

  const [state, setState] = useState({
    page: 1,
    skip: true,
    filter: null,
  });
  const { user, page, skip, filter } = state;

  const { data = [] } = useGetProfilePageQuery(
    { filter, page },
    { skip: skip }
  );

  useEffect(() => {
    if (UserExists({ userobj, loading })) {
      setState((state) => ({
        ...state,
        filter: { filter: { user: userobj.pk } },
        skip: false,
      }));
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

export default Profile;
