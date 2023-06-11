import { Link, useLocation } from "react-router-dom";
import GalleryImages from "components/Image/GalleryImages";
import LoadContent from "containers/posts/LoadContent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeletePostMutation } from "endpoints/rtkQuery/postEndpoints";
import getQueryLength from "components/jobs/getQueryLength";
import { useSelector } from "react-redux";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
const PostGallery = ({ states, data }) => {
  const { userobj } = useSelector((state) => state.user);
  const location = useLocation();
  const state = states.state;
  const setState = states.setState;
  const [trash, setTrash] = useState({
    trash_mode: false,
    items: [],
    loading: false,
  });
  const { trash_mode, items, loading } = trash;
  const [delete_posts, result, isLoading] = useDeletePostMutation();
  const add_to_trash = (post_pk) => {
    if (!items.includes(post_pk)) {
      setTrash({ ...trash, items: [...items, post_pk] });
    } else {
      setTrash({
        ...trash,
        items: items.filter(function (post) {
          return post !== post_pk;
        }),
      });
    }
  };
  const set_trash_mode = (post_pk) => {
    setTrash({ ...trash, trash_mode: !trash_mode });
  };
  useEffect(() => {
    if (result.data === 200) {
      window.location.reload(false);
    }
  }, [result]);
  if (getQueryLength(data.nested_data.data) > 0) {
    if (!trash_mode) {
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
              {userobj?.pk === data.nested_data.user.pk ? (
                <div onClick={() => set_trash_mode()}>
                  <FontAwesomeIcon
                    className="text-light"
                    icon="fa-regular fa-trash-can "
                  />
                </div>
              ) : (
                <></>
              )}

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
                    {result.status != "pending" ? (
                      <GalleryImages
                        style={{ width: "12vw", height: "12vw" }}
                        image={post.image}
                      />
                    ) : (
                      <BootstrapSpinner />
                    )}
                  </Link>
                  {/* add overlay on hover */}
                </div>
              ))}
            </div>
          </div>
          <LoadContent data={data} states={{ state, setState }} />
        </>
      );
    } else {
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
              <div>
                <div onClick={() => delete_posts(items)}>
                  <FontAwesomeIcon
                    className="text-success"
                    icon="fa-regular fa-trash-can "
                  />
                </div>
                <div onClick={() => set_trash_mode()}>
                  <FontAwesomeIcon
                    className="text-danger"
                    icon="fa-regular fa-circle-xmark "
                  />
                </div>
              </div>
              {data.nested_data?.data.map((post) => (
                <div className="gallery-item mt-2 " key={post.pk}>
                  <div onClick={() => add_to_trash(post.pk)}>
                    <GalleryImages
                      style={
                        items.includes(post.pk)
                          ? {
                              width: "12vw",
                              height: "12vw",
                              filter: " brightness(50%)",
                            }
                          : { width: "12vw", height: "12vw" }
                      }
                      image={post.image}
                    />
                  </div>
                  {/* add overlay on hover */}
                </div>
              ))}
            </div>
          </div>
          <LoadContent data={data} states={{ state, setState }} />
        </>
      );
    }
  }
};

export default PostGallery;
