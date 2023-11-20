import React from "react";
import { PostLoading } from "./post-loading";
import { Stack } from "@chakra-ui/react";
import PostItem from "./post-item";

export const Posts = () => {
  return (
    <>
      {false ? (
        <PostLoading />
      ) : (
        <Stack>
          {[0, 1, 2, 3].map((i) => (
            <PostItem key={i} />
          ))}
        </Stack>
      )}
    </>
  );
};
