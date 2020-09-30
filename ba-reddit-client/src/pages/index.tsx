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
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  if(!fetching && !data) {
    return <div>Error, no posts loaded</div>
  }

  return (
    <Layout varient="regular">
      <Flex align="center">
        <Heading>Hello!</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">
            <Button variantColor="teal" size="md">
              Create Post
            </Button>
          </Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <Spinner />
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.contentSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && (
        <Flex>
          <Button isLoading={fetching} m="auto" variantColor="teal" my={10}>
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

// setup Urql provider
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
