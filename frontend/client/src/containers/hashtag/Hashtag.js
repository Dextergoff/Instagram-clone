import { useParams } from "react-router-dom";
import { useGetHashtagQuery } from "endpoints/rtkQuery/hashtagEndpoints";
import { useState } from "react";
import Layout from "Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostGallery from "containers/profile/PostGallery";
import Navbar from "Navbar/Navbar";
const Hashtag = () => {
  const params = useParams();
  const hashtag = params.hashtag;
  const [state, setState] = useState({
    page: 1,
    filter: { filter: { hashtags: hashtag } },
  });
  const { page, filter } = state;

  const { data = [] } = useGetHashtagQuery({ filter, page });

  const loadMorePosts = () => {
    setState({
      ...state,
      page: page + 1,
    });
  };

  return (
    <Layout>
      <>
        <div className="d-flex gap-3 justify-content-center mt-4 ">
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
      <Navbar />
    </Layout>
  );
};

export default Hashtag;
