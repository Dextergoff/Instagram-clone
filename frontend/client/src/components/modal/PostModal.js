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
        <Modal
          dialogClassName="custom-modal"
          className="d-flex "
          show={show}
          onHide={handleClose}
        >
          <Modal.Body
            className={"modal-body d-flex border border-secondary bg-black"}
          >
            <div className="post-container d-flex flex-column">
              <PostImage image={data.image} />
              <InteractionBar
                queryName={queryName}
                updateCacheArgument={updateCacheArgument}
                addArgument={addArgument}
                post={data}
              />
              <CreateComment post={data} />
              <CommentSection pk={data.pk} />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
};

export default PostModal;
