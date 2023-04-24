import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import {
  faHeart,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { useLikeCommentMutation } from "endpoints/rtkQuery/commentEndpoints";
import CreateComment from "./CreateComment";
import updateLikes from "./modules/in_interactionbar/updateLikes";
const CommentInteractionBar = (props) => {
  const [interactionState, setInteractionSate] = useState({
    display: false
  })
  const { display } = interactionState;

  const { userobj } = useSelector((state) => state.user);

  const [likeComment, result] = useLikeCommentMutation();
  
  const dispatch = useDispatch();
  // const replyingto = props.data.replyingto ? props.data.replyingto : null
  const page = props.page;
  const comment = props.comment;
  const pk = comment.pk;

  const user = userobj?.pk;



  useEffect(() => {
    result.status === "fulfilled" &&
     updateLikes({ dispatch, result,pk,page})
     console.log(result)
  }, [ result,pk,page,dispatch,]);
  return (

    <>
      <div className="d-flex gap-2">
    
        <div
          onClick={() => likeComment({ pk, user })}
          name="like"
          id="like"
          className={
            comment.likes.includes(userobj?.pk)
              ? "text-danger"
              : "text-light"
          }
        >
          <FontAwesomeIcon size="sm" icon={faHeart} />
        </div>
      </div>
      
    </>
  );

};

export default CommentInteractionBar;