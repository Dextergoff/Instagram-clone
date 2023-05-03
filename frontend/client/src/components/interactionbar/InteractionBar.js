import { useSelector, useDispatch } from "react-redux";
import {
  faHeart,
  faPaperPlane,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useLikePostMutation } from "endpoints/rtkQuery/postEndpoints";
import TitleAndHashtags from "components/posts/TitleAndHashtags";
import { Link, useLocation } from "react-router-dom";
import UpdateLikes from "components/update_cache/UpdateLikes";
const InteractionBar = ({
  addArgument,
  updateCacheArgument,
  queryName,
  post,
  displaycommentbtn,
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
      UpdateLikes({queryName, updateCacheArgument, addArgument, result, dispatch})
  }, [result, addArgument, dispatch, queryName, updateCacheArgument ]);

  return (
    <>
      <div className="d-flex mt-2 mb-2 gap-3">
        <div>
          <div className="border-0 text-dark">
            <FontAwesomeIcon
              className="text-light"
              size="xl"
              icon={faPaperPlane}
            />
          </div>
        </div>
        {displaycommentbtn ? (
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
              className="text-light"
              size="xl"
              icon={faComment}
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
            <FontAwesomeIcon size="xl" icon={faHeart} />
          </div>
          {post.likecount > 0 ? (
            <div className="text-muted fw-bold">{post.likecount}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="d-flex gap-1 mb-1"></div>
    </>
  );
};

export default InteractionBar;
