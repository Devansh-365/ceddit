import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getCommunities, onJoinLeaveCommunity } from "../../api/communities";
import { Link } from "react-router-dom";
import { FaConnectdevelop } from "react-icons/fa";
import { isLoggedIn } from "../../utils/auth";

export const TopCommunities = () => {
  const user = isLoggedIn();
  const [communities, setCommunities] = useState([]);

  const isUserJoinCommunity = (community) => {
    if (!user) return false;
    if (community.subscribedBy.includes(user.userId)) return true;
  };

  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, []);

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        cursor={"pointer"}
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/recCommsArt.png')"
      >
        Explore Communities
      </Flex>
      <Flex direction="column">
        {communities.length === 0 ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              return (
                <Link key={item._id} to={`/community/${item._id}`}>
                  <Flex
                    position="relative"
                    align="center"
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    p="10px 12px"
                    fontWeight={600}
                  >
                    <Flex width="80%" align="center">
                      <Flex width="15%">
                        <Text mr={2}>{index + 1}</Text>
                      </Flex>
                      <Flex align="center" width="80%">
                        {false ? (
                          <Image
                            borderRadius="full"
                            boxSize="28px"
                            src={item.imageURL}
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={FaConnectdevelop}
                            fontSize={30}
                            color="brand.100"
                            mr={2}
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >{`${item.name}`}</span>
                      </Flex>
                    </Flex>
                    <Box position="absolute" right="10px">
                      <Button
                        height="22px"
                        fontSize="8pt"
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinLeaveCommunity(item._id, user);
                        }}
                        variant={true ? "outline" : "solid"}
                      >
                        {isUserJoinCommunity(item) ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
          </>
        )}
      </Flex>
    </Flex>
  );
};
