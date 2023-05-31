import NoAuthLayout from "Layout/NoAuthLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRegistered, login } from "endpoints/auth/user";
import { useEffect } from "react";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import handleErrors from "../../components/errors/handleErrors";
import onSubmit from "components/forms/onSubmit";
import SubmitButton from "./SubmitButton";
const Login = ({ Redirect }) => {
  const dispatch = useDispatch();
  const { userobj, response, rejected } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const { password, email } = formData;

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loading) {
      try {
        dispatch(login({ email, password }));
      } catch (err) {
        return err;
      }
    }
  }, [loading]);

  if (userobj) Redirect({ location: "/" });
  // TODO seperate inputs into components
  return (
    <NoAuthLayout>
      <div className="mt-5">
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
        <div role="alertdialog" className="error-msg text-danger text-center ">
          {response ? handleErrors({ response, rejected }) : <></>}{" "}
        </div>
        <div>
          <div className="mt-5">
            <SubmitButton loading={loading} setLoading={setLoading} />
          </div>

          <div className="d-flex justify-content-center">
            <div className="mt-4">
              <div
                onClick={() => Redirect({ location: "/forgot/" })}
                className="mt-4 text-light"
              >
                forgot password?
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <div
                onClick={() => Redirect({ location: "/register/" })}
                className="ml-4 text-light "
              >
                new user?
              </div>
            </div>
          </div>
        </div>
      </div>
    </NoAuthLayout>
  );
};

export default Login;
