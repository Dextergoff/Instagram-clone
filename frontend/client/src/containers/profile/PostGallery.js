import { Link, useLocation } from "react-router-dom";
import GalleryImages from "components/Image/GalleryImages";
import LoadContent from "containers/posts/LoadContent";
const PostGallery = ({ states, data }) => {
  const location = useLocation();
  const state = states.state;
  const setState = states.setState;
  return (
    <>
      <div>
        <div className="gallery d-flex flex-wrap justify-content-center  gap-3">
          <div
            style={{
              borderBottomStyle: "solid",
              borderWidth: "1px",
              width: "100%",
            }}
          ></div>
          {data.nested_data?.data.map((post) => (
            <div className="gallery-item mt-2 " key={post.pk}>
              <Link
                className="comments-link text-muted fw-light text-decoration-none"
                to={`/${post.pk}`}
                state={{
                  background: location,
                  queryName: "getPost",
                  post: post,
                  addArgument: null,
                  updateCacheArgument: post.pk,
                }}
              >
                <GalleryImages
                  style={{ width: "12vw", height: "12vw" }}
                  image={post.image}
                />
              </Link>
              {/* add overlay on hover */}
            </div>
          ))}
        </div>
      </div>
      <LoadContent data={data} states={{ state, setState }} />
    </>
  );
};

export default PostGallery;