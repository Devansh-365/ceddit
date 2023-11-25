import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { BASE_URL } from "../config";
import Comments from "../components/post/comment";
import PostItem from "../components/post/post-item";
import SecondaryLayout from "../components/layout/secondary-layout";
import { Layout } from "../components/layout";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const Query = query.toString().slice(0, -1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + "api/posts/search?" + Query);
        const data = await response.json();

        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [Query]);

  return (
    <Layout>
   
    <Box p={4}>
      <Heading mb={4}>Search Results for "{query}"</Heading>

      {loading && <Spinner size="xl" />}

      {!loading && searchResults.length === 0 && <Text>No results found.</Text>}

      {!loading && searchResults.length > 0 && (
        <List>
          {searchResults.map((result) => (
            <ListItem key={result.id}>
            <PostItem post={result} /> 
          <Comments  post={result} />
            </ListItem>
            
          ))}
        </List>
      )}
    </Box>
    </Layout>
   
  );
};

export default SearchPage;
