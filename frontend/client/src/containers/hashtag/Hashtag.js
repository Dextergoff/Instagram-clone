import { useParams } from "react-router-dom";
import { useGetHashtagPostsQuery } from "endpoints/rtkQuery/hashtagEndpoints";
import { useState } from "react";
import Layout from "Layout/Layout";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GalleryImages from "components/Image/GalleryImages";
import { useSelector } from "react-redux";
import PostGallery from "components/profile/PostGallery";
const Hashtag = () => {
  const params = useParams();
  const hashtag = params.hashtag;
  const [state, setState] = useState({
    page: 1,
    filter: { filter: { hashtags: hashtag } },
  });
  const { page, filter } = state;

  const { data = [] } = useGetHashtagPostsQuery({ filter, page });

  const loadMorePosts = () => {
    setState({
      ...state,
      page: page + 1,
    });
  };

  return (
    <Layout>
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
        <PostGallery data={data} states={{ state, setState }} />
        {!data.end_of_data ? (
          <div className="d-flex justify-content-center">
            <button className="btn" onClick={() => loadMorePosts()}>
              {" "}
              <FontAwesomeIcon
                size="xl"
                icon="fa-regular fa-plus-square"
              />{" "}
            </button>
          </div>
        ) : (
          <></>
        )}
      </>
    </Layout>
  );
};

export default Hashtag;
