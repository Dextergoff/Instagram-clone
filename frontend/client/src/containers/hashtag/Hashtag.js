import { useParams } from "react-router-dom";
import { useGetHashtagPostsQuery } from "endpoints/rtkQuery/hashtagEndpoints";
import { useState } from "react";
import Layout from "Layout/Layout";
import { Link, useLocation } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GalleryPostImage from "components/Image/GalleryPostImage";
const Hashtag = () => {
  const [stateData, setStateData] = useState({
    page: 1,
  });
  const { page } = stateData;

  const location = useLocation();

  const params = useParams();
  const hashtag = params.hashtag;

  const { data = [] } = useGetHashtagPostsQuery({ hashtag, page });

  const loadMorePosts = () => {
    setStateData({ ...stateData, page: page + 1 });
  };

  return (
    <Layout>
      <div>
        <>
          <div className="d-flex gap-3 justify-content-center ">
            <div className="username  fw-light align-self-center text-light">
              #{hashtag}
            </div>
          </div>

          <div className="d-flex gap-5 mt-4 justify-content-center">
            <div className="h6 align-self-center fw-light mb-5 text-light">
              {data?.post_count} posts
            </div>
          </div>
          <div className="gallery ">
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
          {!data.end_of_data ? (
            <div className="d-flex justify-content-center">
              <button className="btn" onClick={() => loadMorePosts()}>
                {" "}
                <FontAwesomeIcon size="xl" icon={faPlusCircle} />{" "}
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
    </Layout>
  );
};

export default Hashtag;
