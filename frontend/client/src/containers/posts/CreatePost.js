import Layout from "Layout/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import { useNavigate } from "react-router-dom";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import ImagePreview from "components/inputs/ImagePreview";
import ImageInput from "components/inputs/ImageInput";
import { useEffect } from "react";
import UserExists from "components/jobs/verification/UserExists";
import TitleInput from "components/inputs/TitleInput";
import Navbar from "Navbar/Navbar";
import "./css/imagelabel.css";
const CreatePost = () => {
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
  const form_data = () => {
    let form_data = new FormData();
    for (let i in formData) {
      form_data.append(i, formData[i]);
    }
    return form_data;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addNewPost(form_data())
      .unwrap()
      .then(() => {
        navigate(`/u/${userobj?.pk}`);
      })
      .then((error) => {});
  };

  useEffect(() => {
    if (UserExists({ userobj, loading })) {
      setFormData({ ...formData, user: userobj.pk });
    }
  }, [loading, userobj]);
  return (
    <Layout>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="d-flex mb-5 justify-content-center">
          <div className="">
            <ImagePreview file={file} />
            <ImageInput states={{ formData, setFormData, file, setFile }} />
            <TitleInput states={{ formData, setFormData }} />

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
            </div>
          </div>
        </div>
      </form>
      <Navbar />
    </Layout>
  );
};

export default CreatePost;
