import Layout from "modules/Layout";
import { useCreatePostMutation } from "endpoints/rtkQuery/splitApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import PostHeading from "./modules/shared/PostHeading";
import BootstrapSpinner from "containers/modules/components/BootstrapSpinner";
import ImagePreview from "./modules/in_createpost/ImagePreview";
import ImageInput from "./modules/in_createpost/ImageInput";
import { useEffect } from "react";
import UserExists from "containers/modules/jobs/verification/UserExists";
import TitleInput from "./modules/in_createpost/TitleInput";
const CreatePostPage = () => {
  const navigate = useNavigate();
  const { userobj, loading } = useSelector((state) => state.user);

  const [addNewPost] = splitApi.useCreatePostMutation();

  const [formData, setFormData] = useState({
    user: null,
    image: null,
    title: "",
  });
  const { user, title, image } = formData;

  const [file, setFile] = useState();
  
  const onSubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData();
    
    for (let i in formData) {
      form_data.append(i, formData[i]);
    }

    addNewPost(form_data)
      .unwrap()
      .then(() => {
        navigate("/u");
      })
      .then((error) => {
      });
  };


  useEffect(() => {
    if (UserExists({ userobj, loading })) {
      setFormData(({ ...formData, user: userobj.pk}));
    }
  }, [loading, userobj]);
 

  return (
    <Layout>
      <>
        {userobj || loading === false ? (
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div className="d-flex mb-5 justify-content-center">
              <div className="">
                <ImagePreview file={file}/>
                <ImageInput states={{formData, setFormData, file, setFile}} />
                <TitleInput states={{formData, setFormData}}/>

                <div className="d-flex justify-content-center">
                  <button
                    className={
                      title && image
                        ? "text-primary btn border-0 shadow-0 mt-3"
                        : "disabled text-primary btn mt-3 border-0 shadow-0"
                    }
                    type="submit"
                  >
                    Post now!
                  </button>
                  {/* seperate this bubtton into a component */}
                </div>
              </div>
            </div>
          </form>
        ) : (
          <BootstrapSpinner/>
        )}
      </>
    </Layout>
  );
};

export default CreatePostPage;
