import Layout from "modules/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetpasswordsendmail } from "endpoints/auth/user";
import handleErrors from "./components/errors/handleErrors";
const ResetPassword = ({handleSubmit}) => {
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;

  const { submited, loading, response } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  if (!submited) {
    return (
      <Layout>
        <form onSubmit={(e)=>handleSubmit({ email, dispatch, e, endpoint:resetpasswordsendmail})}>
        <h3 className="text-center text-light">Reset password</h3>
          <div className="d-flex justify-content-center">
         
          <div className="mb-3 w-25">
          <label className="form-label text-light" htmlFor="email">
              Email
          </label>
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
          {response ? handleErrors({response}): <></>}

          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="d-flex justify-content-center t">
              <button className="btn btn-black rounded-0 border-secondary text-light">Continue</button>
            </div>
          )}
        </form>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h3 className="text-center text-light">check your email to continue</h3>
      </Layout>
    );
  }
};

export default ResetPassword;
