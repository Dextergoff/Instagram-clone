import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCreateCommentMutation } from "endpoints/rtkQuery/commentEndpoints";
import UpdateComments from "components/update_cache/UpdateComments";
import { faHeart, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateComment = (props) => {
  const { userobj } = useSelector((state) => state.user);

  let to = null;
  let reply = props.reply;
  let parent = null;
  let page = null;

  if (props) {
    to = props.to || null;

    reply = props.comment ? true : false;

    parent = reply ? props.comment.pk : props.post.pk;

    page = props.page || undefined;
  }

  const [interactionState, setInteractionSate] = useState({
    display: props.hideform ? false : true,
  });
  const { display } = interactionState;

  const [commentState, setCommentState] = useState({
    body: "",
    parent: parent,
    user: null,
    reply: reply,
    to: to,
  });

  const openReplyForm = () => {
    setInteractionSate({
      ...interactionState,
      display: display ? false : true,
    });
  };

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
      .then(setCommentState({ ...commentState, body: "" }));
    // add comment and clear body
  };

  useEffect(() => {
    result.status === "fulfilled" &&
      UpdateComments({ result, parent, page, dispatch });
    // update comments when the comment has been created and rtk query gets the ok from server
  }, [dispatch, parent, result, page]);

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
