import { useGetReplysQuery } from "endpoints/rtkQuery/replyEndpoints";
import React, { useState } from "react";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
import LikeComment from "components/comments/LikeComment";
import LikeCount from "components/like_count/LikeCount";
const CommentReplys = (props) => {
  const [replyState, setReplySate] = useState({
    page: 1,
    skip: true,
    pk: null,
    hide: false,
  });
  const { page, skip, pk, hide } = replyState;

  const { data = [] } = useGetReplysQuery({ pk, page }, { skip: skip });

  const useCachedData = splitApi.endpoints.getComments.useQueryState({ skip });

  const comment = useCachedData.data?.data.find(
    (item) => item.pk === Number(props.for.pk)
  );

  const loadReplys = (prop) => {
    setReplySate({ ...replyState, pk: prop, skip: false });
  };

  return (
    <div
      style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "20px" }}
    >
      {data.data?.map((reply) => (
        <div className={hide ? "d-none" : ""} key={reply.pk}>
          {reply.parent === pk ? (
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
              comment={comment}
              reply={false}
              to={reply.username}
              page={page}
              hideform={true}
            />
          </div>
        </div>
      ))}
      {comment.replycount > 0 && !data.end_of_data ? (
        <div
          onClick={() => loadReplys(props.for.pk)}
          className="text-muted mb-2"
        >
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
