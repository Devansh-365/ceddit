import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCommunity } from "../../api/communities";

export const DeleteCommunityModal = ({ communityId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await deleteCommunity(communityId);
    if (!data.error) {
      toast.success("Community deleted successfully!");
      navigate("/explore");
      onClose();
    } else {
      toast.error("Community failed to delete!");
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen}>
        <Icon as={AiOutlineDelete} mr={2} />
        <Text fontSize="9pt">Delete</Text>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Delete Community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
              Are you sure you want to delete this community?
            </Text>
            {/* <form style={{ width: "100%" }}>
            <Box>
              <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                Name
              </Text>
              <InputItem
                name="name"
                placeholder="name"
                type="text"
                mb={2}
                onChange={onChange}
              />
            </Box>
            <Box mt={4}>
              <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                About Community
              </Text>
              <Textarea
                name="bio"
                onChange={onChange}
                fontSize="10pt"
                placeholder="About Community"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                bg={"gray.50"}
                ht="100px"
              />
            </Box>
          </form> */}
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={onClose} variant={"outline"}>
              Close
            </Button>
            <Button onClick={onSubmit}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
