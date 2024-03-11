import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Stack } from "@chakra-ui/react";
import { PostLoading } from "./post-loading";
import PostItem from "./post-item";
import { getPosts } from "../../api/posts";
import { BASE_URL } from "../../config";

export const Posts = ({ posts, setPosts, sortType}) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/posts/page/1`);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    await fetch(`${BASE_URL}api/posts/page/${index}`)
      .then(async (res) => {
        const data = await res.json();
        setItems((prevItems) => [...prevItems, ...data]);

        data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  const fetchSortedData = async () => {
    await fetch(`${BASE_URL}api/posts/page/${index}`)
      .then(async (res) => {
        const data = await res.json();

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

        setPosts((prevItems) => [...prevItems, ...sortedPosts]);

        data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  }
  

  return (
    <>
      {
        posts ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchSortedData}
            hasMore={hasMore}
            loader={<PostLoading />}
          >
            <Stack>
              {posts.map((item, i) => (
                <PostItem post={item} key={i} />
              ))}
            </Stack>
          </InfiniteScroll>
        )
          : (
            items.length === 0 ? (
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
            )

          )
      }
    </>
  );
};
