import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import { Layout } from "../components/layout";
import usePageMeta from "../utils/meta";

const Feature = ({ title, text, icon }) => {
  usePageMeta();

  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      textAlign={"center"}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export const Homepage = () => {
  return (
    <Layout>
      <Container maxW={"4xl"} height={"auto"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 16, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Empowering Developers <br />
            <Text as={"span"} color={"blue.400"}>
              with Collaborative Learning
            </Text>
          </Heading>
          <Text color={"gray.500"} mx={"auto"}>
            A Dynamic Platform for Developers: Fostering Collaborative Learning
            through Programming Question Posting and Knowledge Sharing{" "}
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"blue.400"}
              rounded={"full"}
              px={6}
              as={"a"}
              href="/explore"
              _hover={{
                bg: "blue.500",
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Box py={{ base: 10, md: 24 }} px={{ base: 4, md: 16 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "3xl", md: "5xl" }}
          lineHeight={"110%"}
          textAlign={"center"}
        >
          Features
        </Heading>
        <SimpleGrid
          py={{ base: 6, md: 12 }}
          columns={{ base: 1, md: 3 }}
          spacing={10}
          mt={4}
        >
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Lifetime Support"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Unlimited Donations"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Instant Delivery"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
        </SimpleGrid>
      </Box>
    </Layout>
  );
};
