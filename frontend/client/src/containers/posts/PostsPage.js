import Layout from "modules/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CreateComment from "../comment/CreateComment";
import InteractionBar from "../modules/components/InteractionBar";
import { useGetPageQuery } from "endpoints/rtkQuery/postEndpoints";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostImage from "containers/modules/components/PostImage";
import PostHeading from "./modules/shared/PostHeading";
import getQueryLength from "containers/modules/jobs/getQueryLength";
// ADD LIKES CART AND SHARE
//MAKE PFP WORK
// ADD VIRTUALZATION / PAGINATION TO QUERYS BOTH COMMENTS AND POSTS
const PostsPage = () => {
  const [stateData, setStateData] = useState({
    Page: 1,
  });
  const { Page } = stateData;
  const {data=[]} = useGetPageQuery(Page);
  const handleLoadPosts = () => {
    setStateData({ ...stateData, Page: Page + 1 });
  };
  // BATCH LIKE REUQESTS SO ONE NESTED REQUEST IS SENT TO SERVER ON PAGECHAGE INSTEAD OF EVERY CLICK
  if(getQueryLength(data) > 0)
  
    return (
      <Layout>
        <>
          {data.nested_data?.data.map((post) => (
            <div className="d-flex justify-content-center mb-5" key={post.pk}>
              <div className="mt-5">
               <PostHeading username={post.username} />
                <PostImage image={post.image} />

                <InteractionBar
                  updateCacheArgument={post.page}
                  queryName="getPage"
                  post={post}
                  displaycommentbtn={true}
                />

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
