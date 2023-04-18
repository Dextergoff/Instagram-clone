import { useState } from "react";
import Layout from "modules/Layout";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "endpoints/auth/user";
import handleErrors from "./components/errors/handleErrors";
const RegisterPage = ({handleSubmit, Redirect}) => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;

  const { registered, loading, response } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (registered) return <Navigate to="/login" />;

  return (
    <Layout title="Auth Site | Register" content="Register page">
      <h3 className="text-light text-center">Register</h3>
      <form className="mt-5" onSubmit={(e)=>handleSubmit({username, email, password, dispatch, e, endpoint:register})}>
        <div className="d-flex justify-content-center">
          <div className="form-group w-25">
          <label className="form-label text-light" htmlFor="username">
              Username
            </label>
            <input
              autoComplete="off"
              className="form-control form-control-sm bg-black border-dark text-light"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={onChange}
              value={username}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-group w-25 mt-3">
          <label className="form-label text-light" htmlFor="email">
              Email
            </label>
            <input
              className="form-control form-control-sm bg-black border-dark text-light"
              type="email"
              placeholder="email"
              name="email"
              id="email"
              onChange={onChange}
              value={email}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-group w-25 mt-3">
          <label className="form-label text-light" htmlFor="password">
              Password
            </label>
            <input
              className="form-control form-control-sm bg-black border-dark text-light"
              type="password"
              placeholder="password"
              name="password"
              id="password"
              onChange={onChange}
              value={password}
              required
            />
          </div>
        </div>
        {response ? handleErrors({response}): <></>}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary rounded-0 bg-black border-secondary mt-4">Continue</button>
            </div>
            <div>
              <div onClick={(e)=>Redirect({location:"/login"})} className="d-flex text-light mt-2 justify-content-center">
                already have an account?
              </div>
            </div>
          </div>
        )}
      </form>
    </Layout>
  );
};

export default RegisterPage;
