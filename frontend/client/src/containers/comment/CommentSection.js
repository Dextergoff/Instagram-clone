import { useGetCommentsQuery } from "endpoints/rtkQuery/commentEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CommentInteractionBar from "../../components/comments/CommentInteractionBar";
import CommentReplys from "./CommentReplys";
import getQueryLength from "components/jobs/getQueryLength";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
const CommentSection = (prop) => {
  const [commentState, setCommentState] = useState({
    page: 1,
  });
  const { page } = commentState;

  const pk = prop.pk;
  const { data = [] } = useGetCommentsQuery({ pk, page });

  const loadMoreComments = () => {
    setCommentState({ ...commentState, page: page + 1 });
  };

  if (getQueryLength(data) > 0)
    // return if data is not empty
    return (
      <div className="comments-container ">
        {data?.data.map((comment) => (
          <div className="" key={comment.pk}>
            <div className="d-flex gap-1">
              <DisplayPfp
                style={{ width: "2rem", height: "2rem", borderRadius: "100%" }}
                pfp={process.env.REACT_APP_API_URL + comment.user.pfp}
              />
              <CommentUsername data={comment.user} />
              <CommentBody data={comment.body} />
            </div>
            <div className="d-flex gap-2">
              <CommentInteractionBar comment={comment} page={page} />
              <CreateComment comment={comment} page={page} hideform={true} />
            </div>
            <CommentReplys replysfor={comment} />
          </div>
        ))}
        {!data.end_of_data ? (
          <div className="d-flex justify-content-center">
            <button
              onClick={() => loadMoreComments()}
              className="btn text-light"
            >
              <FontAwesomeIcon size="xl" icon={faPlusCircle} />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
};
export default CommentSection;
