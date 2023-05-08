import React, { useState } from "react";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
import LikeComment from "components/comments/LikeComment";
import LikeCount from "components/like_count/LikeCount";
import { useGetCommentsQuery } from "endpoints/rtkQuery/commentEndpoints";
const CommentReplys = (props) => {
  const [replyState, setReplySate] = useState({
    page: 1,
    skip: true,
    parent: null,
    hide: false,
  });
  const { page, skip, parent, hide } = replyState;

  const { data = [] } = useGetCommentsQuery({ parent, page }, { skip: skip });

  const useCachedData = splitApi.endpoints.getComments.useQueryState({ skip });

  const comment = useCachedData.data?.data.find(
    (item) => item.pk === Number(props.for)
  );

  const loadReplys = (prop) => {
    setReplySate({ ...replyState, parent: prop, skip: false });
  };

  return (
    <div
      style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "20px" }}
    >
      {data.data?.map((reply) => (
        <div className={hide ? "d-none" : ""} key={reply.pk}>
          {reply.parent === parent ? (
            <div className="d-flex gap-1 ">
              <DisplayPfp
                pfp={process.env.REACT_APP_API_URL + reply.user.pfp}
                style={{ width: "2rem", height: "2rem", borderRadius: "100%" }}
              />
              <CommentUsername data={reply.user} />
              {reply.to ? (
                <div className="text-primary  mr-auto fw-light">
                  @{reply.to}
                </div>
              ) : (
                <></>
              )}

              {/* replying to needs to be changed since if the person being replyed to changes there name it wont get updated as of now */}
              <CommentBody data={reply.body} />
              <LikeComment comment={reply} page={page} />
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex gap-2 pb-3">
            <LikeCount
              style={{
                fontSize: "0.8rem",
                color: "#6c757d",
                fontWeight: "bold",
              }}
              data={reply}
            />

            <CreateComment
              reply={false}
              to={reply.username}
              page={page}
              parent={reply}
              hideform={true}
            />
          </div>
        </div>
      ))}
      {comment.replys && !data.end_of_data ? (
        <div onClick={() => loadReplys(props.for)} className="text-muted mb-2">
          view replys
        </div>
      ) : (
        // TODO ADD HIDE REPLYS
        <></>
      )}
      {/* ADD PAGINATION */}
    </div>
  );
};

export default CommentReplys;
