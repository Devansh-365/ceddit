import React from "react";
import { Layout } from "../components/layout";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Posts } from "../components/post/posts";
import { CreatePostBtn } from "../components/community/create-post-btn";
import { TopCommunities } from "../components/community/top-communities";
import usePageMeta from "../utils/meta";
import { SidePostCommunity } from "../components/community/side-post-community";
import { Stack } from "@chakra-ui/react";
import { isLoggedIn } from "../utils/auth";

export const ExplorePage = () => {
  const user = isLoggedIn();
  usePageMeta("Ceddit | Explore");

  return (
    <Layout>
      <SecondaryLayout>
        <>
          {user ? <CreatePostBtn /> : null}
          <Posts />
        </>
        <Stack gap={4}>
          <SidePostCommunity />
          <TopCommunities />
        </Stack>
      </SecondaryLayout>
    </Layout>
  );
};
