import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCreateCommentMutation } from "endpoints/rtkQuery/commentEndpoints";
import UpdateComments from "./modules/in_createcomment/UpdateComments";
const CreateComment = (props) => {
  const [commentState, setCommentState] = useState({
    body: "",
    parent: null,
    user: null,
    isreply:null,
    replyingto:null
  });
  const { body } = commentState;

  const { userobj } = useSelector((state) => state.user);

  const [addComment, result] = useCreateCommentMutation();
  
  const parent = props.parent
  const page = props.page
  
  const dispatch = useDispatch();
 
  const handleChange = (e) => {
    setCommentState({
      ...commentState,
      [e.target.name]: e.target.value,
      parent: props.parent,
      user: userobj.pk,
      replyingto: props.replyingto?.username,
      isreply:props.isreply||false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(commentState)
      .unwrap()
      .then(setCommentState({ ...commentState, body: "", parent: null }));
  };

  useEffect(() => {
    result.status === "fulfilled" &&
      UpdateComments({result, parent, page, dispatch})
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
            // onChange={onChange}
            // value={comment}
            required
          />
        </form>
      </div>
    </>
  );
};

export default CreateComment;
