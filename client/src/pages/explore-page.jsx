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
import { getPost, getPosts } from "../api/posts";
import { socket } from "../utils/socket";

export const ExplorePage = () => {
  const user = isLoggedIn();
  usePageMeta("Ceddit | Explore");

  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState("");

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
            // sortedPosts = data;
        }
        setPosts(sortedPosts);
        socket.emit("postUpdated");
      });
    
  }, [sortType, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("postUpdated", async (postId) => {
        const updatedPost = await getPost(postId);
        const updatedPosts = posts.map((post) =>
          post._id === postId ? updatedPost : post
        );
        setPosts(updatedPosts);
      });

      return () => {
        socket.off("postUpdated");
      };
    }
  }, [sortType, socket, posts]);

  return (
    <Layout>
      <SecondaryLayout>
        <>
          {user ? <CreatePostBtn handleSort={handleSort} /> : null}
          <Posts posts={posts} setPosts={setPosts} sortType={sortType}/>
        </>
        <Stack gap={4}>
          <SidePostCommunity />
          <TopCommunities />
        </Stack>
      </SecondaryLayout>
    </Layout>
  );
};
