import React, { useState } from "react";
import { Layout } from "../components/layout";
import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import InputItem from "../components/ui/input";
import { login } from "../api/users";
import { useNavigate } from "react-router-dom";
import usePageMeta from "../utils/meta";
import { loginUser } from "../utils/auth";
import toast from "react-hot-toast";

export const LoginPage = () => {
  usePageMeta("Ceddit | Login");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    const data = await login(form);
    if (!data.token) {
      toast.error("Something went wrong!");
      setFormError(data.error);
    } else {
      loginUser(data);
      toast.success("Logged in successfully!");
      navigate("/explore");
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <Container
        maxW={"300px"}
        height={"80vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={10}
      >
        <Heading>Login</Heading>

        <form style={{ width: "100%" }} onSubmit={onSubmit}>
          <InputItem
            name="email"
            placeholder="email"
            type="text"
            mb={2}
            onChange={onChange}
          />
          <InputItem
            name="password"
            placeholder="password"
            type="password"
            onChange={onChange}
          />
          <Button
            width="100%"
            height="36px"
            mb={2}
            mt={2}
            type="submit"
            //   isLoading={loading}
          >
            Log In
          </Button>
          <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>New here?</Text>
            <Text
              color="blue.500"
              fontWeight={700}
              cursor="pointer"
              as={"a"}
              href="/register"
            >
              SIGN UP
            </Text>
          </Flex>
        </form>
      </Container>
    </Layout>
  );
};
