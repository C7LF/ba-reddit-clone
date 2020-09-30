import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout varient="regular">
      <Flex>
        <Heading>Hello!</Heading>
        <NextLink href="/create-post">
          <Link>
            <Button variantColor="teal" ml={5} size="md">
              Create Post
            </Button>
          </Link>
        </NextLink>
      </Flex>
      <br />
      {!data ? (
        <Spinner />
      ) : (
        <Stack spacing={8}>
          {data.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.content}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

// setup Urql provider
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
