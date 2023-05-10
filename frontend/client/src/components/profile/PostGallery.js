import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GalleryPostImage from "components/Image/GalleryPostImage";
const PostGallery = ({ state, data }) => {
  const location = useLocation();

  const loadMorePosts = () => {
    state.setState({ ...state.state, page: page + 1 });
  };
  const { page } = state.state;
  return (
    <>
      <div className="gallery">
        {data.nested_data?.data.map((post) => (
          <div className="gallery-item " key={post.pk}>
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
              <GalleryPostImage image={post.image} />
            </Link>
            {/* add overlay on hover */}
          </div>
        ))}
      </div>
      {!data?.end_of_data ? (
        <div className="d-flex justify-content-center">
          <button className="btn" onClick={() => loadMorePosts()}>
            <FontAwesomeIcon size="xl" icon="fa-regular fa-plus-square" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostGallery;
