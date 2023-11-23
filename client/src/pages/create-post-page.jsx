import React, { useEffect, useState } from "react";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";
import usePageMeta from "../utils/meta";
import { isLoggedIn } from "../utils/auth";
import { PostForm } from "../components/post/post-form";
import { Box, Divider, Text } from "@chakra-ui/react";

export const CreatePostPage = () => {
  const user = isLoggedIn() || undefined;

  usePageMeta(`Ceddit | Create Post`);

  return (
    <Layout>
      <SecondaryLayout>
        <>
          <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
            <Text fontWeight={600}>Create a post</Text>
          </Box>
          <Divider my={4} />
          <PostForm />
        </>
        <></>
      </SecondaryLayout>
    </Layout>
  );
};
