import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./tab-item";
import TextInputs from "./text-inputs";
import ImageUpload from "./image-upload";
import { ChevronDownIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { createPost } from "../../../api/posts";
import { getCommunities } from "../../../api/communities";
import { useNavigate } from "react-router-dom";

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
    content: "",
  });
  const [community, setCommunity] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, [community, setCommunity]);

  const onTextChange = ({ target: { name, value } }) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleCreatePost = async () => {
    const data = await createPost({
      title: textInputs.title,
      content: textInputs.content,
      imageUrl: selectedFile,
      communityId: community,
    });
    if (!data.error) {
      toast.success("Post created successfully!");
      navigate(`/explore`);
    } else {
      toast.error("Post failed to create!");
    }
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
        onChange={(e) => setCommunity(e.target.value)}
      >
        {communities.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
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
              handleCreatePost={handleCreatePost}
              loading={false}
            />
          )}
          {selectedTab === "Images" && (
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setSelectedTab}
              selectFileRef={selectFileRef}
            />
          )}
        </Flex>

        
      </Flex>
    </>
  );
};
