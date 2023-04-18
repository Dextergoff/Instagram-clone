import { useGetCommentsQuery } from "endpoints/rtkQuery/commentEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CommentInteractionBar from "./CommentInteractionBar";
import CommentReplys from "./CommentReplys";
import getQueryLength from "containers/modules/jobs/getQueryLength";
const CommentSection = (prop) => {
  const [commentState, setCommentState] = useState({
    page: 1,
  });
  const {page } = commentState;
  const parent = prop
  const pk = parent.pk;
  const { data = [] } = useGetCommentsQuery({ pk, page });
  
  const loadMoreComments = () => {
    setCommentState({ ...commentState, page: page + 1 });
  };

  if (getQueryLength(data) > 0 )
    return (
      <div className="comments-container ">
        {data?.data.map((comment) => (
          <div className="" key={comment.pk}>
            <div className="d-flex gap-1">
              <div className=" mr-auto fw-bold text-light">
                {comment.username}
              </div>
              <div style={{ width: "24vw" }} className="text-light">
                {comment.body}
              </div>
            </div>
            <CommentInteractionBar
              data={comment}
              parent={comment.pk}
              page={page}
              isreply = {true}
            />
            <CommentReplys comment={comment} />
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
