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

const PostGallery = ({ state, data }) => {
  const location = useLocation();

  const loadMorePosts = () => {
    state.setState({ ...state.state, page: page + 1 });
  };
  const { page } = state.state;
  return (
    <>
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
            <FontAwesomeIcon size="xl" icon={faPlusCircle} />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostGallery;
