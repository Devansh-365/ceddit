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

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
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
      <Container maxW={"3xl"} height={"auto"}>
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
            Make money from <br />
            <Text as={"span"} color={"blue.400"}>
              your audience
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
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
