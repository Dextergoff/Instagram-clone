import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetpassword } from "endpoints/auth/user";
import { useSearchParams } from "react-router-dom";
import { authorizereset } from "endpoints/auth/user";
import { useEffect } from "react";
import handleErrors from "../../components/errors/handleErrors";
import NoAuthLayout from "Layout/NoAuthLayout";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "./SubmitButton";
const ResetPassword = () => {
  const [formData, setFormData] = useState({ newpassword: "", error: "" });
  const { newpassword } = formData;

  const { verified, rejected, submited } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [queryParameters] = useSearchParams();
  const uid = queryParameters.get("uid");

  const dispatch = useDispatch();

  const ValidatePassword = (prop) => {
    let error;
    if (prop.length < 8) {
      error += "password is too short";
    }
    if (!/[a-zA-Z]/.test(prop)) {
      error += "Password is too insecure";
    }
    return error;
  };
  const handleChange = (e) => {
    e.preventDefault();
    let errors = ValidatePassword(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: errors,
    });
  };

  useEffect(() => {
    dispatch(authorizereset({ uid }));
  }, [uid, dispatch]);

  useEffect(() => {
    if (loading) {
      dispatch(resetpassword({ newpassword }));
    }
  }, [loading]);

  if (verified) {
    return (
      <NoAuthLayout>
        <div className="d-flex justify-content-center">
          <div
            style={{ width: "30vw" }}
            className="border rounded-1 border-secondary p-3 mt-5"
          >
            <div
              style={{ fontSize: "1.5rem" }}
              className="text-center text-light mt-5"
            >
              Reset Your Password
            </div>
            <div className="d-flex justify-content-center">
              <div style={{ width: "15vw" }} className="mb-5 mt-5">
                <input
                  placeholder="New password"
                  type="password"
                  name="newpassword"
                  value={newpassword}
                  onChange={handleChange}
                  className="form-control form-control-sm bg-black border-dark text-light"
                  id="newpassword"
                />
              </div>
            </div>
            <SubmitButton loading={loading} setLoading={setLoading} />
          </div>
        </div>
      </NoAuthLayout>
    );
  }

  if (rejected) {
    return (
      <NoAuthLayout>
        <div className="d-flex justify-content-center">
          <div
            style={{ width: "30vw" }}
            className="border rounded-1 border-secondary p-3 mt-5"
          >
            <div
              style={{ fontSize: "1.5rem" }}
              className="text-center text-light mt-5"
            >
              Something went wrong
            </div>
            <div className="text-center mt-3">
              <a href="/login" className="text-primary">
                Return to Login
              </a>
            </div>
            <div className="mb-5 mt-5 text-center ">
              <FontAwesomeIcon
                style={{ width: "6rem", height: "6rem" }}
                className="text-danger"
                icon="fa-regular fa-circle-xmark"
              />
            </div>
          </div>
        </div>
      </NoAuthLayout>
    );
  }

  if (submited) {
    return (
      <NoAuthLayout>
        <div className="d-flex justify-content-center">
          <div
            style={{ width: "30vw" }}
            className="border rounded-1 border-secondary p-3 mt-5"
          >
            <div
              style={{ fontSize: "1.5rem" }}
              className="text-center text-light mt-5"
            >
              Password successfully Reset!
            </div>
            <div className="text-center mt-3">
              <a href="/login" className="text-primary">
                Return to Login
              </a>
            </div>
            <div className="mb-5 mt-5 text-center ">
              <FontAwesomeIcon
                style={{ width: "6rem", height: "6rem" }}
                className="text-success"
                icon="fa-regular fa-check-circle"
              />
            </div>
          </div>
        </div>
      </NoAuthLayout>
    );
  }
};

export default ResetPassword;
