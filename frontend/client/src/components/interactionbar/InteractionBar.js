import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useLikePostMutation } from "endpoints/rtkQuery/postEndpoints";
import { Link, useLocation } from "react-router-dom";
import UpdateLikes from "./UpdateLikes";
import LikeCount from "components/interactionbar/LikeCount";
const InteractionBar = ({
  addArgument,
  updateCacheArgument,
  queryName,
  post,
  feed,
}) => {
  // arguments and data passed from object in post
  const { userobj } = useSelector((state) => state.user);
  const [likePost, result] = useLikePostMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const requser = userobj?.pk;
  const pk = post.pk;

  useEffect(() => {
    result.status === "fulfilled" &&
      UpdateLikes({
        queryName,
        updateCacheArgument,
        addArgument,
        result,
        dispatch,
      });
  }, [result, addArgument, dispatch, queryName, updateCacheArgument]);

  return (
    <>
      <div className="d-flex mt-2 mb-2 gap-3">
        <div>
          <div className="border-0 text-dark">
            <Link
              className="comments-link text-muted fw-light text-decoration-none"
              to={`/dm/u`}
              state={{
                target_user: post.user,
              }}
            >
              <FontAwesomeIcon
                size="xl"
                className="text-light"
                icon="fa-regular fa-paper-plane"
              />
            </Link>
          </div>
        </div>
        {feed ? (
          <Link
            className="comments-link text-muted fw-light text-decoration-none"
            to={`/${post.pk}`}
            state={{
              background: location,
              queryName: queryName,
              post: post,
              addArgument: addArgument,
              updateCacheArgument: updateCacheArgument,
            }}
          >
            <FontAwesomeIcon
              size="xl"
              className="text-light"
              icon="fa-regular fa-comment"
            />
          </Link>
        ) : (
          <></>
        )}

        <div className=" d-flex gap-2">
          <div
            onClick={() => likePost({ pk, requser })}
            name="like"
            id="like"
            className={
              userobj != null && post.likes.includes(userobj.pk)
                ? "text-danger"
                : "text-light"
            }
          >
            <FontAwesomeIcon size="xl" icon="fa-regular fa-heart" />
          </div>
        </div>
      </div>
      <LikeCount
        style={{
          fontSize: "1rem",
          color: "#FBFBFB",
          fontWeight: "bold",
        }}
        data={post}
      />
    </>
  );
};

export default InteractionBar;
