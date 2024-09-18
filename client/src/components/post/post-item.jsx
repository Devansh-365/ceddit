import React, { useState } from "react";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaConnectdevelop } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import { downvotePost, upvotePost } from "../../api/posts";
import moment from "moment";
import { DeletePostModal } from "../modals/delete-post";
import { EditPostModel } from "../modals/edit-post-model";
import { socket } from "../../utils/socket";

const PostItem = ({ post }) => {
  const user = isLoggedIn();
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [userUpvoted, setUserUpvoted] = useState(post?.upvotedBy?.includes(user?.userId) || false);
  const [userDownvoted, setUserDownvoted] = useState(post?.downvotedBy?.includes(user?.userId) || false);
  const [upvoteCount, setUpvoteCount] = useState(post?.upvotedBy?.length || 0);
  const singlePostView = false;
  const { isOpen, onOpen, onClose } = useDisclosure();


  const isUserUpvote = (community) => {
    if (!user) return false;
    if (post?.upvotedBy?.includes(user.userId)) return true;
  };

  const isUserDownvote = (community) => {
    if (!user) return false;
    if (post?.downvotedBy?.includes(user.userId)) return true;
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    setLoadingDelete(true);
  };
  const upvoteHandler = async () => {
    try {
      if (!user) return;

      if (!userUpvoted) {
        const response =await upvotePost(post._id, user);
        setUserUpvoted(true);
        setUpvoteCount(prevCount => prevCount + 1);
        console.log(response)
        if (userDownvoted) {
          setUserDownvoted(false); 
          setUpvoteCount(prevCount => prevCount -1);
        }
        else {
          // Optional: Handle case for removing the upvote (toggle)
          await upvotePost(post._id, user);
          setUserUpvoted(false);
          setUpvoteCount(prevCount => prevCount - 1); // Decrement the count
        }
      } 
      
    } catch (error) {
      console.log(error);
    }}
    const downvoteHandler = async () => {
      try {
        if (!user) return;
  
        if (!userDownvoted) {
          await downvotePost(post._id, user);
          setUserDownvoted(true);
          
          if (userUpvoted) {
            setUserUpvoted(false); 
            setUpvoteCount(prevCount => prevCount - 1);
          }
        }  else {
          // Optional: Handle case for removing the downvote (toggle)
          await upvotePost(post._id, user);
          setUserDownvoted(false);
          setUpvoteCount(prevCount => prevCount + 1); // Increment the count
        }
       
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
      <Flex
        border="1px solid"
        bg="white"
        borderColor={singlePostView ? "white" : "gray.300"}
        borderRadius={singlePostView ? "4px 4px 0px 0px" : 4}
        _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
        //   onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
      >
        <Flex
          direction="column"
          align="center"
          bg={singlePostView ? "none" : "gray.100"}
          p={2}
          width="40px"
          borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
        >
           <Icon
          as={userUpvoted ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userUpvoted ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={upvoteHandler}
        />
          <Text fontSize="9pt" fontWeight={600}>
            { upvoteCount }
          </Text>
          <Icon
          as={userDownvoted ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userDownvoted ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={downvoteHandler}
        />
        </Flex>
        <Flex direction="column" width="100%">
          <Stack spacing={1} p="10px 10px">
            {true && (
              <Stack
                direction="row"
                spacing={0.6}
                align="center"
                justify={"space-between"}
                fontSize="9pt"
              >
                <Stack direction="row" align="center">
                  {true && (
                    <>
                      {false ? (
                        <Image
                          borderRadius="full"
                          boxSize="18px"
                          //   src={post.communityImageURL}
                          mr={2}
                        />
                      ) : (
                        <Icon
                          as={FaConnectdevelop}
                          fontSize={18}
                          mr={1}
                          color="blue.500"
                        />
                      )}
                      <Link to={`/community/${post?.community?._id}`}>
                        <Text
                          fontWeight={700}
                          _hover={{ textDecoration: "underline" }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          {post?.community?.name}
                        </Text>
                      </Link>
                      <Icon as={BsDot} color="gray.500" fontSize={8} />
                    </>
                  )}
                  <Text color="gray.500">
                    Posted by {post?.user?.username}{" "}
                    {moment(post?.createdAt).fromNow()}
                  </Text>
                </Stack>
                <Link to={`/community/${post?.community?._id}/${post?._id}`}>
                  <Flex align={"center"}>
                    <Text
                      color={"gray.500"}
                      mr={2}
                      _hover={{ textDecoration: "underline" }}
                    >
                      See more
                    </Text>
                    <Flex
                      direction="column"
                      align="center"
                      bg={"blue.600"}
                      p={2}
                      width="32px"
                      borderRadius={"full"}
                    >
                      <Icon as={FiArrowUpRight} fontSize={16} color="white" />
                    </Flex>
                  </Flex>
                </Link>
              </Stack>
            )}
            <Text fontSize="12pt" fontWeight={600}>
              {post.title}
            </Text>
            <Text fontSize="10pt">{post?.content}</Text>
            {post.imageUrl && (
              <Flex justify="center" align="center" p={2}>
                {/* {loadingImage && (
                  <Skeleton height="200px" width="100%" borderRadius={4} />
                )} */}
                <Image
                  width="80%"
                  maxWidth="500px"
                  maxHeight="460px"
                  src={post.imageUrl}
                  display={false ? "none" : "unset"}
                  // onLoad={() => setLoadingImage(false)}
                  alt="Post Image"
                />
              </Flex>
            )}
          </Stack>
          <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              as={"a"}
              href={`/community/${post?.community?._id}/${post?._id}`}
            >
              <Icon as={BsChat} mr={2} />
              <Text fontSize="9pt">{post?.commentCount}</Text>
            </Flex>
            {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex> */}
            {user && (user.isAdmin || user?.userId === post?.user?._id) && (
              <Flex
                align="center"
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                onClick={handleDelete}
              >
                <EditPostModel post={post} />
              </Flex>
            )}
            {user && (user.isAdmin || user?.userId === post?.user?._id) && (
              <Flex
                align="center"
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                as={"button"}
              >
                <DeletePostModal postId={post?._id} />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default PostItem;
