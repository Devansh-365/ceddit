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

export const CommunityPage = () => {
  let params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getCommunityPosts(params.communityId).then((item) => {
      console.log("POSTS : ", item);
      setPosts(item);
    });
  }, [params.communityId, posts, setPosts]);
  usePageMeta(`Ceddit | ${params.communityId}`);

  return (
    <Layout>
      <Header community={posts} />
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
