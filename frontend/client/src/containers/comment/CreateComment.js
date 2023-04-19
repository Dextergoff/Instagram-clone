import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCreateCommentMutation } from "endpoints/rtkQuery/commentEndpoints";
import UpdateComments from "./modules/in_createcomment/UpdateComments";
const CreateComment = (props) => {
  const { userobj } = useSelector((state) => state.user);

  let replyingto = null
  let isreply = null
  let parent = null
  let page = null

  if(props.data){
    replyingto  = props.data.replyingto || null
  
    isreply = props.data.comment ? true: false 
    // if a comment is passed to props as its parent it is a reply
    
    parent = isreply? props.data.comment.pk : props.data.post.pk

    page = props.data.page || undefined
    // if its a reply get the comment data else get the post data for parent
  }
  

  const [commentState, setCommentState] = useState({
    body: "",
    parent: parent,
    user: null,
    isreply:isreply,
    replyingto: replyingto
  });

  const { body } = commentState;

  const [addComment, result] = useCreateCommentMutation();
  
  
  const dispatch = useDispatch();
 
  const handleChange = (e) => {
    setCommentState({
      ...commentState,
      body: e.target.value,
      user: userobj.pk,
    });
    // sets the author and body when input is changed 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(commentState)
      .unwrap()
      .then(setCommentState({ ...commentState, body: ""}));
      // add comment and clear body
  };

  useEffect(() => {
    result.status === "fulfilled" &&
      UpdateComments({result, parent, page, dispatch})
      // update comments when the comment has been created and rtk query gets the ok from server
  }, [dispatch, parent, result, page]);

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Add a comment..."
            style={{ boxShadow: "none", padding: 0 }}
            autoComplete="off"
            className="form-control border-0 fw-light bg-black text-light"
            type="text"
            name="body"
            value={body}
            required
          />
        </form>
      </div>
    </>
  );
};

export default CreateComment;
