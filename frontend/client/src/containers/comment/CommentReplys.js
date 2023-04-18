import { useGetReplysQuery } from "endpoints/rtkQuery/replyEndpoints";
import CommentInteractionBar from "./CommentInteractionBar";
import React, { useState } from "react";
import { splitApi } from "endpoints/rtkQuery/splitApi";
const CommentReplys = (props) => {

  const [replyState, setReplySate] = useState({
    page: 1,
    skip: true,
    pk: null,
  })
  const { page, skip, pk } = replyState;

  const { data = [] } = useGetReplysQuery({ pk, page }, { skip: skip });

  const useCachedData = splitApi.endpoints.getComments.useQueryState({skip});

  const  comment = useCachedData.data?.data.find(
    (item) => item.pk === Number(props.comment.pk)
  );


  const loadReplys = (prop) => {
    setReplySate({ ...replyState, pk: prop, skip: false })
  }

  return (
    <div style={{ marginLeft: '10px', marginBottom: '20px' }}>
      {data.data?.map((reply) => (

        <div key={reply.pk}>
          {reply.parent === pk ?
            <div className="d-flex gap-1">
              <div className=" mr-auto fw-bold text-light">
                {reply.username}
              </div>
              {reply.replyingto ?
                <div>
                  <div className="text-light">{`>`}</div>

                </div>
                : <></>}
              <div className=" mr-auto fw-bold text-light">
                {reply.replyingto}
              </div>

              <div style={{ width: "24vw" }} className="text-light">
                {reply.body}
              </div>
            </div>
            :
            <></>
          }
          <CommentInteractionBar
            data={reply}
            parent={comment.pk}
            page={page}
            isreply={true}
            isnestedreply={true}
          />
        </div>
      ))}
      {comment.replycount > 0 && !(data.end_of_data) ?
        <div onClick={() => loadReplys(props.comment.pk)} className="text-muted mb-2">view replys</div>
        : <></>
      }
      {/* ADD PAGINATION */}

    </div>
  );
};

export default CommentReplys;
