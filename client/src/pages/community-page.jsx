import React from "react";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";
import About from "../components/community/about";
import { CreatePostBtn } from "../components/community/create-post-btn";
import Header from "../components/community/header";
import { Posts } from "../components/post/posts";
import usePageMeta from "../utils/meta";
import { useParams } from "react-router-dom";

export const CommunityPage = () => {
  let params = useParams();
  console.log("first : ", params);

  usePageMeta(`Ceddit | ${params.communityId}`);

  return (
    <Layout>
      <Header />
      <SecondaryLayout>
        <>
          <CreatePostBtn />
          <Posts />
        </>
        <>
          <About />
        </>
      </SecondaryLayout>
    </Layout>
  );
};
