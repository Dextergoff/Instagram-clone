import { useSelector } from "react-redux";
import { useGetProfilePageQuery } from "endpoints/rtkQuery/profileEndpoints";
import Layout from "modules/Layout";
import { useState } from "react";
import "./css/ProfilePage.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GalleryPostImage from "containers/modules/components/GalleryPostImage";
import BootstrapSpinner from "containers/modules/components/BootstrapSpinner";
import getQueryLength from "containers/modules/jobs/getQueryLength";
import UserExists from "containers/modules/jobs/verification/UserExists";
const ProfilePage = () => {

  const location = useLocation();
  
  const { userobj, loading } = useSelector((state) => state.user);

  const [state, setState] = useState({
    page: 1,
    pk: null,
    skip: true,
  });
  const { pk, page, skip } = state;


  const { data = [] } = useGetProfilePageQuery({ pk, page }, { skip: skip });
  console.log()
  const loadMorePosts = () => {
    setState({ ...state, page: page + 1 });
  };

  useEffect(() => {
   if (UserExists({userobj, loading})){
      setState(state => ({ ...state, pk: userobj.pk, skip: false }));
   }

  }, [loading, userobj]);

  if (getQueryLength(data) > 0){
    return (
      <Layout>
        <>
          <div className="d-flex gap-3 justify-content-center ">
            <div className="username  fw-light  text-light fw-bold align-self-center">
              {userobj.username}
            </div>
            <button className="btn btn-sm btn-dark">Edit profile</button>
          </div>

          <div className="d-flex gap-5 mt-4 justify-content-center">
            <div className="h6 align-self-center text-light fw-light">
              {data?.post_count} posts
            </div>
            <div className="h6 align-self-center text-light fw-light">
              0 followers
            </div>
            <div className="h6 align-self-center text-light fw-light">
              0 following
            </div>
          </div>
          <div className="d-flex gap-5 mt-4 justify-content-center ">
            <div className="h6 align-self-center text-light fw-light">
              description
            </div>
          </div>
          <div className="gallery">
            {data.nested_data?.data.map((post) => (
              <div className="gallery-item " key={post.pk}>
                <Link
                  className="comments-link text-muted fw-light text-decoration-none"
                  to={`/${post.pk}`}
                  state={{
                    background: location,
                    queryName: "getPost",
                    post: post,
                    addArgument: null,
                    updateCacheArgument: post.pk,
                  }}
                >
                  <GalleryPostImage image={post.image} />
                </Link>
                {/* add overlay on hover */}
              </div>
            ))}
          </div>
          {!data?.end_of_data ? (
            <div className="d-flex justify-content-center">
              <button className="btn" onClick={() => loadMorePosts()}>
                {" "}
                <FontAwesomeIcon size="xl" icon={faPlusCircle} />{" "}
                {/* NOT WORKING */}
              </button>
            </div>
          ) : (
            <></>
          )}
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
