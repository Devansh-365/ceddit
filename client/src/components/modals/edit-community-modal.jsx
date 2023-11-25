import React, { useState } from "react";
import {
  Box,
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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import InputItem from "../ui/input";
import { updateCommunity } from "../../api/communities";

export const EditCommunityModel = ({ community }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: community?.name || "",
    bio: community?.bio || "",
  });

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await updateCommunity(community?._id, form);
    if (!data.error) {
      toast.success("Community updated successfully!");
      navigate(0);
      onClose();
    } else {
      toast.error("Community failed to update!");
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen}>
        <Icon as={AiOutlineEdit} mr={2} />
        <Text fontSize="9pt">Edit</Text>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Edit Community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ width: "100%" }}>
              <Box>
                <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                  Name
                </Text>
                <InputItem
                  name="name"
                  placeholder="Name"
                  type="text"
                  mb={2}
                  defaultValue={community?.name}
                  onChange={onChange}
                />
              </Box>
              <Box mt={4}>
                <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                  Description
                </Text>
                <Textarea
                  name="bio"
                  defaultValue={community?.bio}
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
            </form>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={onClose} variant={"outline"}>
              Close
            </Button>
            <Button onClick={onSubmit}>Edit Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
