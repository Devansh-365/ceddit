import { Input } from "@chakra-ui/react";
import React from "react";

const InputItem = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  mb,
  bg,
  size,
  defaultValue,
}) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      required
      onChange={onChange}
      mb={mb}
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
      bg={bg || "gray.50"}
      size={size}
      type={type}
      borderRadius={4}
    />
  );
};
export default InputItem;
