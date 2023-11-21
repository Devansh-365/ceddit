import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

export const CreatePostBtn = () => {
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      {/* <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} /> */}
      <Input
        placeholder="Create Post"
        fontSize="10pt"
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
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        // onClick={onClick}
      />
      {/* <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" /> */}
      <Menu
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              fontSize="10pt"
              border="1px solid"
              borderRadius={4}
              bg="gray.50"
              borderColor="gray.200"
              height="36px"
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              minW={36}
            >
              Sort By
            </MenuButton>
            <MenuList>
              <MenuItem fontSize="10pt">Download</MenuItem>
              <MenuItem fontSize="10pt">Create a Copy</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};