import Layout from "Layout/Layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRegistered, login } from "endpoints/auth/user";
import { useEffect } from "react";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import handleErrors from "../../components/errors/handleErrors";
const LoginPage = ({handleSubmit,Redirect}) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const { password, email } = formData;

  const { loading, userobj, registered, response , rejected} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (registered) dispatch(resetRegistered());
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (userobj) Redirect({location:"/"});
  return (
    <Layout title="Login" content="Login page">
      <form className="mt-5" onSubmit={(e)=>handleSubmit({password, email, dispatch, e, endpoint:login})}>
        <div className="d-flex justify-content-center  ">
          <div className="form-group  w-25">
            <label className="form-label text-light" htmlFor="email">
              Email
            </label>

            <input
              className="form-control form-control-sm bg-black border-dark text-light shadow-none"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
              required
            />

          </div>
        </div>

        <div className="d-flex justify-content-center  ">
          <div className="form-group w-25 mt-3">

            <label className="form-label text-light" htmlFor="password">
              Password
            </label>

            <input
              className="form-control  form-control-sm bg-black border-dark text-light shadow-none"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={password}
              required
            />

          </div>
        </div>

          <div role='alertdialog' className="error-msg text-danger text-center ">{response ? handleErrors({response, rejected}):<></>} </div>
          


        {loading ? (
          <BootstrapSpinner/>
        ) : (
          <div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mt-4 rounded-0 bg-black border-secondary">Continue</button>
            </div>
            <div className="d-flex justify-content-center">
              <div className="mt-4">
                <div onClick={()=>Redirect({location:"/resetpasswordsm/"})} className="mt-4 text-light">
                  forgot password?
                </div>
              </div>

            </div>
            <div className="d-flex justify-content-center">
              <div>
                <div onClick={()=>Redirect({location:"/register/"})} className="ml-4 text-light ">
                  new user?
                </div>
              </div>
            </div>
          </div>
          // put this in a seprate file
        )}
      </form>
    </Layout>
  );
};

export default LoginPage;
