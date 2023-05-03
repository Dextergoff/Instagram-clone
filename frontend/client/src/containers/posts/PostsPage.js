import Layout from "Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CreateComment from "containers/comment/CreateComment";
import InteractionBar from "components/interactionbar/InteractionBar";
import { useGetPageQuery } from "endpoints/rtkQuery/postEndpoints";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostImage from "components/Image/PostImage";
import PostHeading from "components/posts/PostHeading";
import getQueryLength from "components/jobs/getQueryLength";
import DisplayPfp from "components/Image/DisplayPfp";
import TitleAndHashtags from "components/posts/TitleAndHashtags";
const PostsPage = () => {
  const { userobj } = useSelector((state) => state.user);

  const [stateData, setStateData] = useState({
    Page: 1,
  });
  const { Page } = stateData;
  const { data = [] } = useGetPageQuery(Page);
  const handleLoadPosts = () => {
    setStateData({ ...stateData, Page: Page + 1 });
  };
  if (getQueryLength(data) > 0)
    return (
      <Layout>
        <>
          {data.nested_data?.data.map((post) => (
            <div className="d-flex justify-content-center mb-5" key={post.pk}>
              <div className="mt-5">
                <div className="d-flex gap-3 align-items-center">
                  <DisplayPfp
                    pfp={process.env.REACT_APP_API_URL + post.user.pfp}
                  />
                  <PostHeading post={post} />
                </div>
                <PostImage image={post.image} />

                <InteractionBar
                  updateCacheArgument={post.page}
                  queryName="getPage"
                  post={post}
                  displaycommentbtn={true}
                />
                <TitleAndHashtags post={post} />

                <div>
                  <div></div>
                  <div className="mt-1">
                    <CreateComment post={post} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!data.end_of_data ? (
            <div className="d-flex justify-content-center">
              <button className="btn" onClick={() => handleLoadPosts()}>
                <FontAwesomeIcon size="xl" icon={faPlusCircle} />
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      </Layout>
    );
};

export default PostsPage;
