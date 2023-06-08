import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./css/Modal.css";
import Layout from "Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useGetFollowingQuery } from "endpoints/rtkQuery/profileEndpoints";
import { useLocation } from "react-router-dom";
import getQueryLength from "components/jobs/getQueryLength";
import UserDetails from "containers/posts/UserDetails";
import FollowBtn from "./FollowBtn";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const FollowingModal = () => {
  const { userobj } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { requested_user } = location.state;
  const requested_user_pk = requested_user.pk;
  const [modalState, setModalState] = useState({
    show: true,
    page: 1,
    skip: true,
    pk: null,
  });
  const { show, page, skip, pk } = modalState;
  const handleClose = () => {
    setModalState({ ...modalState, show: false, skip: true });
    navigate(-1);
  };
  useEffect(() => {
    if (userobj) setModalState({ ...modalState, pk: userobj.pk, skip: false });
  }, [userobj]);

  const { data = [] } = useGetFollowingQuery(
    { requested_user_pk, pk, page },
    { skip: skip }
  );
  if (getQueryLength(data) > 0)
    return (
      <Layout>
        <Modal
          size="lg"
          contentClassName="custom-modal border-0 bg-transparent"
          show={show}
          onHide={handleClose}
        >
          <Modal.Body className="d-flex justify-content-center">
            <div
              style={{
                display: "inline-block",
                height: "30vh",
                overflow: "scroll",
                minWidth: "14vw",
              }}
              className=" bg-dark rounded"
            >
              <div className="p-2 text-center text-light">Following</div>
              <div
                style={{
                  borderBottomStyle: "solid",
                  borderWidth: "1px",
                }}
                className=" text-muted"
              />
              {data.nested_data.data.map((following) => (
                <div
                  key={following.pk}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="p-2 ">
                    <UserDetails display_desc={true} user={following} />
                  </div>

                  <div className="p-2 ml-auto">
                    <FollowBtn
                      queryName="getFollowing"
                      is_following={following.is_following}
                      requested_user={following}
                      queryArg={requested_user.pk}
                      secondQueryArg={userobj.pk}
                      page={page}
                      userobj={userobj}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </Layout>
    );
};

export default FollowingModal;
