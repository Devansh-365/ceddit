import React, { useEffect, useState } from "react";
import { PostLoading } from "./post-loading";
import { Stack } from "@chakra-ui/react";
import PostItem from "./post-item";
import { getPosts } from "../../api/posts";

export const Posts = ({ posts }) => {
  return (
    <>
      {posts.length === 0 ? (
        <PostLoading />
      ) : (
        <Stack>
          {posts.map((item, i) => (
            <PostItem post={item} key={i} />
          ))}
        </Stack>
      )}
    </>
  );
};
