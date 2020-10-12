import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, usePostsQuery, useVoteMutation } from "../generated/graphql";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [, vote] = useVoteMutation();
  const [, deletePost] = useDeletePostMutation();

  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>Error, no posts loaded</div>;
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
          {data!.posts.posts.map((post) => (
            <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                pr={5}
              >
                <IconButton
                  onClick={async () => {
                    if (post.voteStatus === 1) {
                      return;
                    }
                    await vote({ postId: post.id, value: 1 });
                  }}
                  icon="chevron-up"
                  aria-label="upvote"
                  variantColor={post.voteStatus === 1 ? "teal" : undefined}
                />
                {post.points}
                <IconButton
                  onClick={async () => {
                    if (post.voteStatus === -1) {
                      return;
                    }
                    await vote({ postId: post.id, value: -1 });
                  }}
                  icon="chevron-down"
                  aria-label="downvote"
                  variantColor={post.voteStatus === -1 ? "red" : undefined}
                />
              </Flex>
              <Box>
                <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                  <Link>
                    <Heading fontSize="xl">{post.title}</Heading>
                  </Link>
                </NextLink>
                <Text color="gray.500" fontWeight="light" letterSpacing="wide">
                  {post.creator.username}
                </Text>
                <Text mt={4}>{post.contentSnippet}</Text>
                <IconButton
                  icon="delete"
                  aria-label="delete post"
                  color="darkred"
                  onClick={() => {
                    deletePost({ id: post.id });
                  }}
                ></IconButton>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            variantColor="teal"
            my={10}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

// setup Urql provider
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
