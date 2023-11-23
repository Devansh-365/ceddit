import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import CommentInput from "./comment-input";
import CommentItem from "./comment-item";

const Comments = ({ user, community }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  return (
    <Box bg="white" pt={4} borderRadius="0px 0px 4px 4px">
      <Flex direction="column" mb={6} fontSize="10pt" width="100%">
        <CommentInput
          comment={comment}
          setComment={setComment}
          loading={false}
          user={user}
          onCreateComment={() => {}}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        {false ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            <CommentItem
              comment={[]}
              onDeleteComment={() => {}}
              isLoading={false}
              userId={user?.userId}
            />
            {!!comments.length ? (
              <>
                {comments.map((item) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    onDeleteComment={() => {}}
                    isLoading={false}
                    userId={user?.userId}
                  />
                ))}
              </>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
