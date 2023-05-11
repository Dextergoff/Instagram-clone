import { useGetCommentsQuery } from "endpoints/rtkQuery/commentEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import LikeComment from "../../components/comments/LikeComment";
import Replys from "./Replys";
import getQueryLength from "components/jobs/getQueryLength";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
import LikeCount from "components/like_count/LikeCount";
const Comments = (prop) => {
  const [commentState, setCommentState] = useState({
    page: 1,
  });
  const { page } = commentState;

  const parent = prop.parent;
  const { data = [] } = useGetCommentsQuery({ parent, page });

  const loadMoreComments = () => {
    setCommentState({ ...commentState, page: page + 1 });
  };

  if (getQueryLength(data) > 0)
    // return if data is not empty
    return (
      <div className="comments-container ">
        {data?.data.map((comment) => (
          <div key={comment.pk}>
            {comment.parent === parent ? (
              <div className="">
                <div className="d-flex gap-1">
                  <DisplayPfp
                    pfp={process.env.REACT_APP_API_URL + comment.user.pfp}
                    style={{
                      width: "2rem",
                      height: "2em",
                      borderRadius: "100%",
                    }}
                  />
                  <CommentUsername data={comment.user} />
                  <CommentBody data={comment.body} />
                  <LikeComment
                    comment={comment}
                    page={page}
                    queryName="getComments"
                  />
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <LikeCount
                    style={{
                      fontSize: "0.8rem",
                      color: "#6c757d",
                      fontWeight: "bold",
                    }}
                    data={comment}
                  />
                  <CreateComment
                    queryName="getReplys"
                    parent={comment}
                    to={comment.user.username}
                    post={comment.post}
                    page={page}
                    hideform={true}
                  />
                  {/* TODO show replies not being displayed when first reply is added */}
                </div>
                <Replys parent={comment} />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
        {!data.end_of_data ? (
          <div className="d-flex justify-content-center">
            <button
              onClick={() => loadMoreComments()}
              className="btn text-light"
            >
              <FontAwesomeIcon size="xl" icon="fa-regular fa-plus-square" />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
};
export default Comments;
