import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./css/Modal.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InteractionBar from "components/interactionbar/InteractionBar";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import CreateComment from "containers/comment/CreateComment";
import { useLocation } from "react-router-dom";
import { useGetPostQuery } from "endpoints/rtkQuery/postEndpoints";
import CommentSection from "containers/comment/CommentSection";
import PostImage from "components/Image/PostImage";
import QueryDecider from "../queryfuncs/QueryDecider";
import PostHeading from "components/posts/PostHeading";
const PostModal = () => {
  const [modalState, setModalState] = useState({
    show: true,
  });
  const { show } = modalState;

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { queryName } = location.state;
  const { addArgument } = location.state;
  const { updateCacheArgument } = location.state;

  const { pk } = params;

  const shouldskipGetPage = !Boolean(queryName === "getPage");
  const shouldskipGetPost = !Boolean(queryName === "getPost");

  const useCachedData = splitApi.endpoints.getPage.useQueryState({
    skip: shouldskipGetPage,
  });
  const queryPost = useGetPostQuery(Number(pk), { skip: shouldskipGetPost });
  const data = QueryDecider({ queryPost, useCachedData, pk });

  const handleClose = () => {
    setModalState({ ...modalState, show: false, skip: true });
    navigate(-1);
  };

  if (data)
    return (
      <>
        <div className="">
          <Modal
            size="lg"
            contentClassName="custom-modal border-0 bg-transparent"
            show={show}
            onHide={handleClose}
          >
            <Modal.Body className="d-flex justify-content-center">
              <div className="img-wrapper">
                <PostImage
                  style={{ height: "100%", width: "100%" }}
                  image={data.image}
                />
              </div>
              <div className="sidebar d-flex flex-column bg-black ">
                <div className="border-bottom  border-secondary mt-2 ">
                  <PostHeading post={data} />
                </div>
                <div className="comment-section">
                  <CommentSection pk={data.pk} />
                </div>
                <div className="mt-auto border-bottom border-top border-secondary ">
                  <InteractionBar
                    queryName={queryName}
                    updateCacheArgument={updateCacheArgument}
                    addArgument={addArgument}
                    post={data}
                  />
                </div>
                <CreateComment post={data} />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
};

export default PostModal;
