import React, { useState } from "react";
import { Flex, Stack, Button, Image } from "@chakra-ui/react";
import { Cloudinary } from "@cloudinary/url-gen";

const ImageUpload = ({
  selectedFile,
  setSelectedFile,
  setSelectedTab,
  selectFileRef,
  onSelectImage,
}) => {
  const [imagePublicId, setImagePublicId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    setLoading(true);

    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const preset = "caxbcy1y"; 
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dvdn0fbf6/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.public_id) {
            setImagePublicId(result.public_id);
          }
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during image upload:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const generateImageUrl = () => {
    if (imagePublicId) {
      const cld = new Cloudinary({
        cloud: {
          cloudName: "dvdn0fbf6",
        },
      });

      const img = cld.image(imagePublicId);
      const imageUrl = img.toURL();
       setSelectedFile(imageUrl);
      return img.toURL();
  
    }

    return "";
  };
console.log(generateImageUrl())
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image src={selectedFile} maxWidth="400px" maxHeight="400px" />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              variant="outline"
              height="28px"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.200"
          borderRadius={4}
          width="100%"
        >
          <Button variant="outline" height="28px"  onClick={() => selectFileRef.current?.click()}>
           upload
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            ref={selectFileRef}
            onChange={handleImageUpload}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
