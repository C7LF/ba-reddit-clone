import React from "react";
import { Box } from "@chakra-ui/core";

interface WrapperProps {
  varient?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ children, varient = "regular" }) => {
  return (
    <Box
      maxW={varient === "regular" ? "800px" : "400px"}
      w="100%"
      mt={10}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
