import React, { useEffect, useState } from "react";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";
import About from "../components/community/about";
import { CreatePostBtn } from "../components/community/create-post-btn";
import Header from "../components/community/header";
import { Posts } from "../components/post/posts";
import usePageMeta from "../utils/meta";
import { useParams } from "react-router-dom";
import { getCommunityPosts } from "../api/communities";
import { Stack } from "@chakra-ui/react";
import PostItem from "../components/post/post-item";

export const CommunityPage = () => {
  let params = useParams();
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState([]);
  const [sortType, setSortType] = useState("createdAt");

  const handleSort = (type) => {
    setSortType(type);
  };

  function toTitleCase(str = "") {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    getCommunityPosts(params.communityId).then((data) => {
      setCommunity(data);
      if (!data) {
        console.error("Invalid data:", data);
        return;
      }
      let sortedPosts;
      switch (sortType) {
        case "createdAt":
          sortedPosts = [...data.posts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "upvotedBy":
          sortedPosts = [...data.posts].sort((a, b) => {
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
          sortedPosts = [...data.posts].sort((a, b) => {
            const aComments =
              typeof a.commentCount === "number" ? a.commentCount : 0;
            const bComments =
              typeof b.commentCount === "number" ? b.commentCount : 0;
            return bComments - aComments;
          });
          break;
        default:
          sortedPosts = data.posts;
      }
      setPosts(sortedPosts);
    });
  }, [params.communityId, sortType]);

  usePageMeta(`Ceddit | ${toTitleCase(posts?.name)}`);

  return (
    <Layout>
      <Header community={community} />
      <SecondaryLayout>
        <>
          <CreatePostBtn handleSort={handleSort} />
          <Stack>
            {posts &&
              posts?.map((item, i) => {
                return <PostItem post={item} key={i} />;
              })}
          </Stack>
        </>
        <>
          <About community={community} />
        </>
      </SecondaryLayout>
    </Layout>
  );
};
