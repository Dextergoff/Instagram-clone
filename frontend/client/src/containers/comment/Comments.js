import { useGetCommentsQuery } from "endpoints/rtkQuery/commentEndpoints";
import React, { useState } from "react";
import LikeComment from "./LikeComment";
import Replys from "./Replys";
import getQueryLength from "components/jobs/getQueryLength";
import CreateComment from "./CreateComment";
import CommentUsername from "./CommentUsername";
import CommentBody from "containers/comment/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
import LikeCount from "components/interactionbar/LikeCount";
import LoadContent from "containers/posts/LoadContent";
import Layout from "Layout/Layout";
import AwaitData from "components/loading/AwaitData";
const Comments = (prop) => {
  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;

  const parent = prop.parent;
  const { data } = useGetCommentsQuery({ parent, page });

  const loadMoreComments = () => {
    setState({ ...state, page: page + 1 });
  };

  return (
    <AwaitData data={data}>
      <Layout>
        <div className="comments-container ">
          {data?.data.map((comment) => (
            <div key={comment.pk}>
              {comment.parent === parent ? (
                <div className="">
                  <div className="d-flex gap-1">
                    <DisplayPfp
                      pfp={process.env.REACT_APP_API_URL + comment.user.pfp}
                      style={{
                        width: "2rem",
                        height: "2em",
                        borderRadius: "100%",
                      }}
                    />
                    <CommentUsername data={comment.user} />
                    <CommentBody data={comment.body} />
                    <LikeComment
                      comment={comment}
                      page={page}
                      queryName="getComments"
                    />
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <LikeCount
                      style={{
                        fontSize: "0.8rem",
                        color: "#6c757d",
                        fontWeight: "bold",
                      }}
                      data={comment}
                    />
                    <CreateComment
                      queryName="getReplys"
                      parent={comment}
                      to={comment.user.username}
                      post={comment.post}
                      page={page}
                      hideform={true}
                      states={{ state, setState }}
                    />
                  </div>
                  <Replys parent={comment} />
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
          <LoadContent data={data} states={{ state, setState }} />
        </div>
      </Layout>
    </AwaitData>
  );
};
export default Comments;
