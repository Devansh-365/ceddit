import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BASE_URL } from "../config";
import Comments from "../components/post/comment";
import PostItem from "../components/post/post-item";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";
import { PostLoading } from "../components/post/post-loading";
import usePageMeta from "../utils/meta";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const Query = query.get("posts");

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageMeta("Ceddit | Search");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          BASE_URL + "api/posts/search?posts=" + Query
        );
        const data = await response.json();

        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [Query]);

  return (
    <Layout>
      <SecondaryLayout>
        <Box p={4}>
          <Heading mb={4} fontSize={"14pt"}>
            Search Results for "{Query}"
          </Heading>
          <Divider />

          {loading && <PostLoading />}

          {!loading && searchResults.length === 0 && (
            <Flex
              direction="column"
              justify="center"
              align="center"
              borderTop="1px solid"
              borderColor="gray.100"
              p={20}
            >
              <Text fontWeight={700} opacity={0.3}>
                No Posts Found
              </Text>
            </Flex>
          )}

          {!loading && searchResults.length > 0 ? (
            <Stack>
              {searchResults.map((result) => (
                <PostItem post={result} key={result.id} />
              ))}
            </Stack>
          ) : null}
        </Box>
        <></>
      </SecondaryLayout>
    </Layout>
  );
};

export default SearchPage;
