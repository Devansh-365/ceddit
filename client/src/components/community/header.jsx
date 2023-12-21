import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaConnectdevelop, FaReddit } from "react-icons/fa";
import { isLoggedIn } from "../../utils/auth";
import { onJoinLeaveCommunity } from "../../api/communities";
import { useNavigate } from "react-router-dom";
import { DeleteCommunityModal } from "../modals/delete-community-modal";
import { EditCommunityModel } from "../modals/edit-community-modal";

const Header = ({ community }) => {
  const user = isLoggedIn();
  const navigate = useNavigate();

  const isUserJoinCommunity = () => {
    if (!user) {
      return false;
    }
    if (community?.subscribedBy?.includes(user?.userId)) return true;
  };
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
              as={FaConnectdevelop}
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
                {community?.name}
              </Text>
              <Flex gap={3}>
                {user &&
                  (user.isAdmin || user?.userId === community?.admin) && (
                    <EditCommunityModel community={community} />
                  )}
                {user &&
                  (user.isAdmin || user?.userId === community?.admin) && (
                    <DeleteCommunityModal communityId={community?._id} />
                  )}
              </Flex>
            </Flex>
            <Flex>
              <Button
                variant={true ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                onClick={() => {
                  if(user){                                                // If user logged in
                    onJoinLeaveCommunity(community._id, user);
                    navigate(0);
                  }
                  else{                                                    // If user not logged in
                    navigate('/login');
                  }
                }}
              >
                {community && isUserJoinCommunity() ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
