import React, { useEffect, useState } from "react";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";
import About from "../components/community/about";
import { CreatePostBtn } from "../components/community/create-post-btn";
import { Posts } from "../components/post/posts";
import usePageMeta from "../utils/meta";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import PostItem from "../components/post/post-item";
import { SidePostCommunity } from "../components/community/side-post-community";
import Comments from "../components/post/comment";
import { isLoggedIn } from "../utils/auth";

export const CommunityPostPage = () => {
  let params = useParams();
  const [post, setPost] = useState([]);
  const user = isLoggedIn() || undefined;

  function toTitleCase(str = "") {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    getPost(params.postId).then((data) => {
      setPost(data);
    });
  }, []);

  usePageMeta(`Ceddit | ${toTitleCase(post?.title)}`);

  return (
    <Layout>
      <SecondaryLayout>
        <>
          {post ? <PostItem post={post} /> : null}
          <Comments user={user?.user} post={post} />
        </>
        <>
          <SidePostCommunity />
        </>
      </SecondaryLayout>
    </Layout>
  );
};
