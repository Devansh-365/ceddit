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
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { isLoggedIn } from "../../../utils/auth";
import { DeleteCommentModal } from "../../modals/delete-comment-modal";
import { EditCommentModel } from "../../modals/edit-comment-modal";

const CommentItem = ({
  comment,
  onDeleteComment,
  isLoading,
  userId,
  reply = false,
}) => {
  const user = isLoggedIn();
  // const [loading, setLoading] = useState(false);

  // const handleDelete = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const success = await onDeleteComment(comment);

  //     if (!success) {
  //       throw new Error("Error deleting comment");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     // setError
  //     setLoading(false);
  //   }
  // }, [setLoading]);

  return (
    <Flex
      border={reply && 2}
      borderStyle={"solid"}
      borderColor={"gray.100"}
      flexDirection={"column"}
      px={reply && 2}
      py={reply && 2}
    >
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
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
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {user && (
            <>
              <EditCommentModel comment={comment} />
              <DeleteCommentModal comment={comment} />
            </>
          )}
        </Stack>
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
