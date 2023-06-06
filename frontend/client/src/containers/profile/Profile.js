import { useSelector } from "react-redux";
import {
  useGetProfilePageQuery,
  useGetUserQuery,
} from "endpoints/rtkQuery/profileEndpoints";
import Layout from "Layout/Layout";
import { useState } from "react";
import { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import PostGallery from "./PostGallery";
import Navbar from "Navbar/Navbar";
import { useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";
const Profile = () => {
  const location = useLocation();

  const params = useParams();
  const { userobj } = useSelector((state) => state.user);
  const requested_user_pk = Number(params.pk);
  const [state, setState] = useState({
    page: 1,
    pk: null,
    skip: true,
  });
  const { page, pk, skip } = state;

  useEffect(() => {
    setState({
      ...state,
      filter: { filter: { user: requested_user_pk } },
      page: 1,
    });
  }, [params, page]);

  useEffect(() => {
    if (userobj)
      setState({
        ...state,
        pk: userobj?.pk,
        skip: false,
      });
  }, [userobj]);

  const { data } = useGetProfilePageQuery(
    { pk, requested_user_pk, page },
    { skip: skip }
  );

  if (data) {
    return (
      <Layout>
        <div className="mt-3">
          <ProfileHeader
            data={data}
            requested_user={data.nested_data.user}
            userobj={userobj}
            location={location}
          />
        </div>
        <PostGallery data={data} states={{ state, setState }} />
        <Navbar />
      </Layout>
    );
  }
};

// TODO check if user is following the users in the following and followers page to properly display follow buttons
export default Profile;
