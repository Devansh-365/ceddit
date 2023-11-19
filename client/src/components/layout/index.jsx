import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";

export const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};
