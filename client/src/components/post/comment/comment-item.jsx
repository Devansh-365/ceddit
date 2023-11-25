import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { FaConnectdevelop, FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
} from "react-icons/io5";
import { isLoggedIn } from "../../../utils/auth";
import { DeleteCommentModal } from "../../modals/delete-comment-modal";
import { EditCommentModel } from "../../modals/edit-comment-modal";
import { BsChat } from "react-icons/bs";
import CommentInput from "./comment-input";
import {
  createComment,
  downvoteComment,
  upvoteComment,
} from "../../../api/comment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CommentItem = ({
  comment,
  onDeleteComment,
  isLoading,
  userId,
  reply = false,
}) => {
  const user = isLoggedIn();
  const [replyInput, setReplyInput] = useState(false);
  const [replyComment, setReplyComment] = useState("");

  const navigate = useNavigate();

  const isUserUpvote = (community) => {
    if (!user) return false;
    if (comment?.upvotedBy?.includes(user.userId)) return true;
  };

  const isUserDownvote = (community) => {
    if (!user) return false;
    if (comment?.downvotedBy?.includes(user.userId)) return true;
  };

  const onCreateReplyComment = async () => {
    const data = await createComment(comment?.post, {
      content: replyComment,
      parentId: comment?._id,
    });
    if (!data.error) {
      toast.success("Comment created successfully!");
      navigate(0);
    } else {
      toast.error("Comment created failed!");
    }
  };

  return (
    <Flex
      border={reply && 2}
      borderStyle={"solid"}
      borderColor={"gray.100"}
      flexDirection={"column"}
      px={reply ? 2 : 0}
      py={reply ? 2 : 0}
    >
      <Box mr={2} mb={1}>
        <Icon as={FaConnectdevelop} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2} fontSize="8pt">
          <Text
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment?.commentedBy?.username}
          </Text>
          {comment?.createdAt && (
            <Text color="gray.600">{moment(comment?.createdAt).fromNow()}</Text>
          )}
          {isLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment?.content}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          fontWeight={600}
          color="gray.500"
        >
          <Icon
            as={isUserUpvote() ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
            color={isUserUpvote() ? "brand.100" : "gray.400"}
            cursor="pointer"
            onClick={() => upvoteComment(comment._id)}
          />
          <Text fontSize="9pt" fontWeight={600}>
            {comment?.upvotedBy?.length - comment?.downvotedBy?.length}
          </Text>
          <Icon
            as={
              isUserDownvote()
                ? IoArrowDownCircleSharp
                : IoArrowDownCircleOutline
            }
            color={isUserDownvote() ? "#4379FF" : "gray.400"}
            fontSize={22}
            cursor="pointer"
            onClick={() => downvoteComment(comment._id)}
          />
          <Flex
            as={"button"}
            onClick={() => setReplyInput(!replyInput)}
            _hover={{ color: "blue.500" }}
          >
            <Icon as={BsChat} mr={1} />
            <Text fontSize="9pt">Reply</Text>
          </Flex>
          {user &&
            (user.isAdmin || user?.userId === comment?.commentedBy?._id) && (
              <>
                <EditCommentModel comment={comment} />
                <DeleteCommentModal comment={comment} />
              </>
            )}
        </Stack>
        {replyInput && user && (
          <Flex direction="column" mb={6} fontSize="10pt" width="100%">
            <CommentInput
              comment={replyComment}
              setComment={setReplyComment}
              loading={false}
              user={user}
              onCreateComment={onCreateReplyComment}
            />
          </Flex>
        )}
      </Stack>
      {comment?.children && (
        <Stack spacing={2} py={2} px={2}>
          {comment?.children.map((reply, i) => {
            return (
              <CommentItem
                key={i}
                comment={reply}
                onDeleteComment={() => {}}
                isLoading={false}
                userId={user?.userId}
                reply={true}
              />
            );
          })}
        </Stack>
      )}
    </Flex>
  );
};
export default CommentItem;
