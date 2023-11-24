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

  function toTitleCase(str = "") {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    getCommunityPosts(params.communityId).then((item) => {
      setPosts(item);
    });
  }, [params.communityId]);

  console.log("Posts", posts);

  usePageMeta(`Ceddit | ${toTitleCase(posts?.name)}`);

  return (
    <Layout>
      <Header community={posts} />
      <SecondaryLayout>
        <>
          <CreatePostBtn />
          <Stack>
            {posts &&
              posts?.posts?.map((item, i) => {
                return <PostItem post={item} key={i} />;
              })}
          </Stack>
        </>
        <>
          <About community={posts} />
        </>
      </SecondaryLayout>
    </Layout>
  );
};
