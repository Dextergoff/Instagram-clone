import Layout from "modules/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetpassword } from "endpoints/auth/user";
import { useSearchParams } from "react-router-dom";
import { resetpasswordverify } from "endpoints/auth/user";
import { useEffect } from "react";
import handleErrors from "./components/errors/handleErrors";
const ResetPassword = () => {
  
  const [formData, setFormData] = useState({ newpassword: "", error:"" });
  const { newpassword, error } = formData;

  const { verified, rejected, submited, response, loading } = useSelector((state) => state.user);
  
  const [queryParameters] = useSearchParams()
  const uid = queryParameters.get("uid")

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetpassword({ newpassword }));
  };
  const ValidatePassword = (prop) => {
    let error
    if(prop.length < 8 ){
        error += "password is too short"
    }
    if(!((/[a-zA-Z]/).test(prop))){
      error += "password needs to contain letters"
    }
    return error
  }
  const onChange = (e) => {
    e.preventDefault();
    let errors = ValidatePassword(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value, error:errors});
    
  };

  

  useEffect(() => {
    dispatch(resetpasswordverify({uid}))
  },[uid, dispatch] );
  

if(verified){
    return (
        <Layout>
          <form onSubmit={onSubmit}>
            <div className="d-flex justify-content-center">
            <div className="mb-3 w-25">
              <input
              placeholder="
              New password
              "
                type="password"
                name="newpassword"
                value={newpassword}
                onChange={onChange}
                className="form-control form-control-sm bg-black border-dark text-light"

                id="newpassword"
              /> 
              {error}
            { response? handleErrors({response, rejected}) : <></>}
              </div>
            </div>
            {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
            <button className="btn btn-black border-secondary rounded-0 text-light">Submit</button>
            </div>
          )}
         
          </form>
        </Layout>
      );
}

if(rejected){
  return (<Layout>
    <h1> Something went wrong please try again</h1>

  </Layout>)
}


if(submited){
    return (<Layout>
        <h1 className="text-light text-center"> password successfully reset return to login</h1>
        <a href="/login/"> login </a>

      </Layout>)
}
  
};

export default ResetPassword;
