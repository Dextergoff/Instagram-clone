import { useState } from "react";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Pfp = ({ states, formData, userobj }) => {
  const { newpfp } = states.formData;
  const { editmode } = states.state;
  const { pfp } = states.userState;

  // const onChange = (e) => {
  //     e.preventDefault();
  //     states.setFormData({
  //       ...states.formData,
  //       [e.target.name]: e.target.value,
  //       user: userobj.pk,
  //     });
  //   };
  return (
    <div>
      {editmode ? (
        <div>
          <input
            autoComplete="off"
            name="newpfp"
            id="newpfp"
            type="file"
            value={newpfp}
            className="d-none"
            // onChange={onChange}
          />
          <label
            htmlFor="newpfp"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "100%",
            }}
            className="btn bg-dark border-0 p-4 btn-light d-flex align-items-center justify-content-center"
          >
            <FontAwesomeIcon
              className="text-muted"
              icon={faPlusCircle}
              size="2xl"
            />
          </label>
        </div>
      ) : (
        <div className="h6 align-self-center text-light fw-light">
          <img
            style={{ width: "70px", height: "70px", borderRadius: "100%" }}
            src={process.env.REACT_APP_API_URL + pfp}
          />
        </div>
      )}
    </div>
  );
};

export default Pfp;
