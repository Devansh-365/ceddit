import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const Header = ({ community }) => {
  console.log("COMMUNITY : ", community);
  /**
   * !!!Don't pass communityData boolean until the end
   * It's a small optimization!!!
   */
  //   const { communityStateValue, loading, error, onJoinLeaveCommunity } =
  //     useCommunityData(!!communityData);
  //   const isJoined = !!communityStateValue.mySnippets.find(
  //     (item) => item.communityId === communityData.id
  //   );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {/* IMAGE URL IS ADDED AT THE VERY END BEFORE DUMMY DATA - USE ICON AT FIRST */}
          {false ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={""}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {community.name}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/sdsd
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={true ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                // onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                // isLoading={loading}
              >
                {true ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
