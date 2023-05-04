import { useGetReplysQuery } from "endpoints/rtkQuery/replyEndpoints";
import CommentInteractionBar from "../../components/comments/LikeComment";
import React, { useState } from "react";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
const CommentReplys = (props) => {
  const [replyState, setReplySate] = useState({
    page: 1,
    skip: true,
    pk: null,
  });
  const { page, skip, pk } = replyState;

  const { data = [] } = useGetReplysQuery({ pk, page }, { skip: skip });

  const useCachedData = splitApi.endpoints.getComments.useQueryState({ skip });

  const comment = useCachedData.data?.data.find(
    (item) => item.pk === Number(props.replysfor.pk)
  );

  const loadReplys = (prop) => {
    setReplySate({ ...replyState, pk: prop, skip: false });
  };

  return (
    <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
      {data.data?.map((reply) => (
        <div key={reply.pk}>
          {reply.parent === pk ? (
            <div className="d-flex gap-1">
              <DisplayPfp
                pfp={process.env.REACT_APP_API_URL + reply.user.pfp}
                style={{ width: "2rem", height: "2rem", borderRadius: "100%" }}
              />
              <CommentUsername data={reply.user} />
              {reply.replyingto ? (
                <div>
                  <div className="text-light">{`>`}</div>
                </div>
              ) : (
                <></>
              )}
              <div className=" mr-auto fw-bold text-muted">
                {reply.replyingto}
              </div>
              {/* replying to needs to be changed since if the person being replyed to changes there name it wont get updated as of now */}
              <div style={{ width: "24vw" }} className="text-light">
                <CommentBody data={reply.body} />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex gap-2">
            <CommentInteractionBar comment={reply} page={page} />
            <CreateComment
              comment={comment}
              replyingto={reply.username}
              page={page}
              hideform={true}
            />
          </div>
        </div>
      ))}
      {comment.replycount > 0 && !data.end_of_data ? (
        <div
          onClick={() => loadReplys(props.replysfor.pk)}
          className="text-muted mb-2"
        >
          view replys
        </div>
      ) : (
        <></>
      )}
      {/* ADD PAGINATION */}
    </div>
  );
};

export default CommentReplys;
