import React from "react";
import { Layout } from "../components/layout";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Posts } from "../components/post/posts";
import { CreatePostBtn } from "../components/community/create-post-btn";
import { TopCommunities } from "../components/community/top-communities";
import usePageMeta from "../utils/meta";

export const ExplorePage = () => {
  usePageMeta("Ceddit | Explore");

  return (
    <Layout>
      <SecondaryLayout>
        <>
          <CreatePostBtn />
          <Posts />
        </>
        <>
          <TopCommunities />
        </>
      </SecondaryLayout>
    </Layout>
  );
};
