import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCreateCommentMutation } from "endpoints/rtkQuery/commentEndpoints";
import UpdateComments from "components/update_cache/UpdateComments";
import { faHeart, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateComment = (props) => {
  const dispatch = useDispatch();

  const { userobj } = useSelector((state) => state.user);

  const page = props.page || undefined;

  const to = props.to || "";

  const queryName = props.queryName || "getComments";

  const [commentState, setCommentState] = useState({
    body: "",
    parent: props.parent,
    user: null,
    post: props.post,
    to: to,
  });
  const { body, parent } = commentState;

  const [interactionState, setInteractionSate] = useState({
    display: props.hideform ? false : true,
  });
  const { display } = interactionState;

  const [addComment, result] = useCreateCommentMutation();

  const openReplyForm = () => {
    setInteractionSate({
      ...interactionState,
      display: display ? false : true,
    });
  };

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
      .then(setCommentState({ ...commentState, body: "" }));
    // add comment and clear body
  };

  useEffect(() => {
    result.status === "fulfilled" &&
      UpdateComments({ result, parent, page, dispatch, queryName });
    // update comments when the comment has been created and rtk query gets the ok from server
  }, [dispatch, parent, result, page, queryName]);

  return (
    <>
      {props.hideform ? (
        <div onClick={() => openReplyForm()}>
          <div style={{ fontSize: "0.8rem" }} className=" text-secondary">
            Reply
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={`replyform ${display ? "" : "d-none"}`}>
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
      </div>
    </>
  );
};

export default CreateComment;
