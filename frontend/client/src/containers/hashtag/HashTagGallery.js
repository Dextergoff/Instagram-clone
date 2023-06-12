import { Link, useLocation } from "react-router-dom";
import GalleryImages from "components/Image/GalleryImages";
import LoadContent from "containers/posts/LoadContent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeletePostMutation } from "endpoints/rtkQuery/postEndpoints";
import getQueryLength from "components/jobs/getQueryLength";
import { useSelector } from "react-redux";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
const HashTagGallery = ({ states, data }) => {
  const { userobj } = useSelector((state) => state.user);
  const location = useLocation();
  const state = states.state;
  const setState = states.setState;
  if (getQueryLength(data.nested_data.data) > 0) {
    return (
      <>
        <div>
          <div className="gallery d-flex flex-wrap justify-content-center  gap-3">
            <div
              style={{
                borderBottomStyle: "solid",
                borderWidth: "1px",
                width: "100%",
              }}
            />

            {data.nested_data?.data.map((post) => (
              <div className="gallery-item mt-2 " key={post.pk}>
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
                  <GalleryImages
                    style={{ width: "12vw", height: "12vw" }}
                    image={post.image}
                  />
                </Link>
                {/* add overlay on hover */}
              </div>
            ))}
          </div>
        </div>
        <LoadContent data={data} states={{ state, setState }} />
      </>
    );
  }
};

export default HashTagGallery;
