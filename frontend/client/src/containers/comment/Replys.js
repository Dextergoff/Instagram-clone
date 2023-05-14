import React, { useState } from "react";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
import LikeComment from "components/comments/LikeComment";
import LikeCount from "components/like_count/LikeCount";
import { useGetReplysQuery } from "endpoints/rtkQuery/commentEndpoints";
import ViewReplys from "components/comments/ViewReplys";
const Replys = (props) => {
  const [state, setState] = useState({
    page: 1,
    skip: true,
    parent: null,
    hide: false,
    open: false,
  });
  const { page, skip, parent, open } = state;

  const { data = [] } = useGetReplysQuery({ parent, page }, { skip: skip });
  
  return (
    <div style={{ marginLeft: "10px", marginTop: "20px" }}>
      <ViewReplys
        parent={props.parent}
        eod={data.end_of_data}
        states={{state, setState}}
      />
      {data.data?.map((reply) => (
        <div className={!open ? "d-none" : ""} key={reply.pk}>

          {reply.parent === parent ? (
            <div className="mb-3">
              <div className="d-flex gap-1">
                <DisplayPfp
                  pfp={process.env.REACT_APP_API_URL + reply.user.pfp}
                  style={{
                    width: "2rem",
                    height: "2em",
                    borderRadius: "100%",
                  }}
                />
                <CommentUsername data={reply.user} />
                <div className="text-primary">@{reply.to}</div>
                <CommentBody data={reply.body} />
                <LikeComment
                  queryName="getReplys"
                  comment={reply}
                  page={page}
                />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <LikeCount
                  style={{
                    fontSize: "0.8rem",
                    color: "#6c757d",
                    fontWeight: "bold",
                  }}
                  data={reply}
                />
                <CreateComment
                  parent={props.parent}
                  to={reply.user.username}
                  post={reply.post}
                  page={page}
                  hideform={true}
                  queryName="getReplys"
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}

      {/* ADD PAGINATION */}
    </div>
  );
};

export default Replys;
