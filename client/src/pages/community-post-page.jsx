import React from "react";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";
import About from "../components/community/about";
import { CreatePostBtn } from "../components/community/create-post-btn";
import { Posts } from "../components/post/posts";
import usePageMeta from "../utils/meta";
import { useParams } from "react-router-dom";

export const CommunityPostPage = () => {
  let params = useParams();
  console.log("first : ", params);

  usePageMeta(`Ceddit | ${params.postId}`);

  return (
    <Layout>
      <SecondaryLayout>
        <>
          {/* <CreatePostBtn />
          <Posts /> */}
        </>
        <>{/* <About /> */}</>
      </SecondaryLayout>
    </Layout>
  );
};
