import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Stack } from "@chakra-ui/react";
import { PostLoading } from "./post-loading";
import PostItem from "./post-item";
import { getPosts } from "../../api/posts";
import { BASE_URL } from "../../config";

export const Posts = ({ posts }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/posts/1`);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    await fetch(`${BASE_URL}api/posts/${index}`)
      .then(async (res) => {
        const data = await res.json();
        setItems((prevItems) => [...prevItems, ...data]);

        data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      {items.length === 0 ? (
        <PostLoading />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<PostLoading />}
        >
          <Stack>
            {items.map((item, i) => (
              <PostItem post={item} key={i} />
            ))}
          </Stack>
        </InfiniteScroll>
      )}
    </>
  );
};
