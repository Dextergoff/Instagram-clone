import NoAuthLayout from "Layout/NoAuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { forgot } from "endpoints/auth/user";
import handleErrors from "../../components/errors/handleErrors";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "./SubmitButton";
const Forgot = () => {
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;
  const [loading, setLoading] = useState(false);
  const { submited, response } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loading) {
      try {
        dispatch(forgot({ email }));
      } catch (err) {
        return err;
      }
    }
  }, [loading]);
  if (!submited) {
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
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={handleChange}
                  className="form-control form-control-sm bg-black border-dark text-light"
                  id="email"
                />
              </div>
            </div>
            <SubmitButton loading={loading} setLoading={setLoading} />
          </div>
        </div>
      </NoAuthLayout>
    );
  } else {
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
              Check your email for instructions
            </div>
            <div className="text-center text-light mt-5">sent to {email}</div>
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

export default Forgot;
