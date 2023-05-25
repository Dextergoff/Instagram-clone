import Layout from "Layout/Layout";
import { useState } from "react";
import CreateComment from "containers/comment/CreateComment";
import InteractionBar from "components/interactionbar/InteractionBar";
import { useGetPageQuery } from "endpoints/rtkQuery/postEndpoints";
import PostImage from "components/Image/PostImage";
import UserDetails from "./UserDetails";
import getQueryLength from "components/jobs/getQueryLength";
import TitleAndHashtags from "./TitleAndHashtags";
import LoadContent from "containers/posts/LoadContent";
import PostAge from "./PostAge";
import Navbar from "Navbar/Navbar";
const Posts = () => {
  const [state, setState] = useState({
    page: 1,
  });
  const { page } = state;
  const { data = [] } = useGetPageQuery(page);

  if (getQueryLength(data) > 0)
    return (
      <Layout>
        {data.nested_data?.data.map((post) => (
          <div className="d-flex justify-content-center " key={post.pk}>
            <div
              style={{
                borderBottomStyle: "solid",
                borderWidth: "1px",
              }}
              className="mt-5"
            >
              <div className="d-flex align-items-center ">
                <UserDetails user={post.user} />
                <PostAge date={post.date} />
              </div>
              <PostImage
                image={post.image}
                style={{
                  width: "20vw",
                  overflow: "hidden",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  borderWidth: "1px",
                }}
              />

              <InteractionBar
                updateCacheArgument={post.page}
                queryName="getPage"
                post={post}
                feed={true}
              />
              <TitleAndHashtags post={post} />

              <div>
                <div></div>
                <div className="mt-1 mb-3">
                  <CreateComment parent={post} post={post.pk} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <LoadContent data={data} states={{ state, setState }} />
        <Navbar />
      </Layout>
    );
};

export default Posts;
