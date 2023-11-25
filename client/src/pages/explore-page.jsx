import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Posts } from "../components/post/posts";
import { CreatePostBtn } from "../components/community/create-post-btn";
import { TopCommunities } from "../components/community/top-communities";
import usePageMeta from "../utils/meta";
import { SidePostCommunity } from "../components/community/side-post-community";
import { Stack } from "@chakra-ui/react";
import { isLoggedIn } from "../utils/auth";
import { getPosts } from "../api/posts";

export const ExplorePage = () => {
  const user = isLoggedIn();
  usePageMeta("Ceddit | Explore");

  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState("createdAt");

  const handleSort = (type) => {
    setSortType(type);
  };

  useEffect(() => {
    getPosts().then((data) => {
      let sortedPosts;
      switch (sortType) {
        case "createdAt":
          sortedPosts = [...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "upvotedBy":
          sortedPosts = [...data].sort((a, b) => {
            const aUpvotes = Array.isArray(a.upvotedBy)
              ? a.upvotedBy.length
              : 0;
            const bUpvotes = Array.isArray(b.upvotedBy)
              ? b.upvotedBy.length
              : 0;
            return bUpvotes - aUpvotes;
          });
          break;
        case "commentCount":
          sortedPosts = [...data].sort((a, b) => {
            const aComments =
              typeof a.commentCount === "number" ? a.commentCount : 0;
            const bComments =
              typeof b.commentCount === "number" ? b.commentCount : 0;
            return bComments - aComments;
          });
          break;
        default:
          sortedPosts = data;
      }
      setPosts(sortedPosts);
    });
  }, [sortType, posts]);

  return (
    <Layout>
      <SecondaryLayout>
        <>
          {user ? <CreatePostBtn handleSort={handleSort} /> : null}
          <Posts posts={posts} />
        </>
        <Stack gap={4}>
          <SidePostCommunity />
          <TopCommunities />
        </Stack>
      </SecondaryLayout>
    </Layout>
  );
};
