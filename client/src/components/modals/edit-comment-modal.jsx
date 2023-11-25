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
import { updateComment } from "../../api/comment";

export const EditCommentModel = ({ comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    content: comment ? comment?.content : "",
  });

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (comment) {
      const data = await updateComment(comment?.post, comment?._id, form);
      if (!data.error) {
        toast.success("Comment updated successfully!");
        navigate(0);
        onClose();
      } else {
        toast.error("Comment failed to update!");
      }
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen}>
        {/* <Icon as={AiOutlineEdit} mr={2} /> */}
        <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
          Edit
        </Text>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ width: "100%" }}>
              <Box>
                <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                  Content
                </Text>
                <Textarea
                  name="content"
                  defaultValue={form.content}
                  onChange={onChange}
                  fontSize="10pt"
                  placeholder="Content"
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
            <Button onClick={onSubmit}>Edit Comment</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
