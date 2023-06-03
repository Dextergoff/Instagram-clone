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
  const { pk } = params;
  const [state, setState] = useState({
    page: 1,
    skip: true,
    filter: null,
  });
  const { page, skip, filter } = state;

  const { data } = useGetProfilePageQuery({ filter, page }, { skip: skip });
  const { user = [] } = useGetUserQuery({ pk });

  useEffect(() => {
    setState((state) => ({
      ...state,
      filter: { filter: { user: Number(pk) } },
      skip: false,
      page: 1,
    }));
  }, []);
  // TODO rtkquery shows the data but it cant be accessed here for some reason
  if (data && user) {
    return (
      <Layout>
        <div className="mt-3">
          <ProfileHeader data={data} userobj={user} />
        </div>
        <PostGallery data={data} states={{ state, setState }} />
        <Navbar />
      </Layout>
    );
  }
};

export default Profile;
