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
const Profile = () => {
  const params = useParams();
  const pk = Number(params.pk);
  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;

  useEffect(() => {
    setState({
      ...state,
      filter: { filter: { user: pk } },
      page: 1,
    });
  }, [params, page]);

  const { data } = useGetProfilePageQuery({ pk, page });

  if (data) {
    return (
      <Layout>
        <div className="mt-3">
          <ProfileHeader data={data} requested_user={data.nested_data.user} />
        </div>
        <PostGallery data={data} states={{ state, setState }} />
        <Navbar />
      </Layout>
    );
  }
};

export default Profile;
