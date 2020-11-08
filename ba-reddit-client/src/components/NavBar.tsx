import React from "react";
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface MenuItems {
  children: any;
  onClick?: () => void;
}

const MenuItems = ({ children, onClick }: MenuItems) => (
  <Text onClick={onClick} mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const NavBar = (props: any) => {
  const router = useRouter();
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    // stop quering if on the server, but run on the client, prevent unnecessary requests
    pause: isServer(),
  });
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="purple.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <NextLink href="/">
            <Link>LiReddit</Link>
          </NextLink>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>LiReddit</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      ></Box>

      {/* display username if logged in */}
      <Box display={data?.me ? "flex" : "none"}>
        <MenuItems>{data?.me?.username}</MenuItems>
        <Link>
          <MenuItems
            onClick={async () => {
              await logout();
              router.reload();
            }}
          >
            Logout
          </MenuItems>
        </Link>
      </Box>

      <Box
        display={{
          sm: show ? "block" : "none",
          md: "flex",
          base: data?.me ? "none" : "flex",
        }}
        mt={{ base: 4, md: 0 }}
        alignItems="center"
      >
        <NextLink href="/login">
          <Link>
            <MenuItems>Login</MenuItems>
          </Link>
        </NextLink>
        <Button bg="transparent" border="1px">
          <NextLink href="/register">
            <Link>Create account</Link>
          </NextLink>
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
