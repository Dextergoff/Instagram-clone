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
        console.log(error);
      });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user: userobj.pk,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, image: e.target.files[0] });
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Layout>
      <>
        {userobj || loading === false ? (
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div className="d-flex mb-5 justify-content-center">
              <div className="">
                <PostHeading username={userobj.username} />
                <ImagePreview file={file}/>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="d-none"
                />

                <div className="d-flex gap-2 mx-auto align-items-center mt-3">
                  <div className="text-light fw-bold" htmlFor="title">
                    {userobj.username}
                  </div>
                  <input
                    value={title}
                    name="title"
                    placeholder="Describe your post with text and #"
                    className=" form-control form-control-sm bg-black border-dark text-light shadow-none "
                    onChange={handleFormChange}
                  />
                </div>

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
        ) : (
          <BootstrapSpinner/>
        )}
      </>
    </Layout>
  );
};

export default CreatePostPage;
