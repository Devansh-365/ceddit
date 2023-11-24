import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./tab-item";
import TextInputs from "./text-inputs";
import ImageUpload from "./image-upload";
import { ChevronDownIcon } from "@chakra-ui/icons";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images",
    icon: IoImageOutline,
  },
];

export const PostForm = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [community, setCommunity] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);

  const onTextChange = ({ target: { name, value } }) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSelectImage = (event) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  return (
    <>
      <Select
        border={2}
        borderStyle={"solid"}
        borderColor={"gray.100"}
        placeholder="Choose a community"
        size={"md"}
        width={"fit-content"}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Flex
        direction="column"
        border={2}
        borderStyle={"solid"}
        borderColor={"gray.100"}
        borderRadius={4}
        mt={2}
      >
        <Flex width="100%">
          {formTabs.map((item, index) => (
            <TabItem
              key={index}
              item={item}
              selected={item.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Flex>
        <Flex p={4}>
          {selectedTab === "Post" && (
            <TextInputs
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={() => {}}
              loading={false}
            />
          )}
          {selectedTab === "Images" && (
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setSelectedTab}
              selectFileRef={selectFileRef}
              onSelectImage={onSelectImage}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};
