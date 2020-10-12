import { Divider, Heading, IconButton, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useDeletePostMutation, usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

export const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    // If query is invalid, then don't bother execting the query (using pause)
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (fetching) {
    return <Layout varient="regular">Loading...</Layout>;
  }

  if (!data?.post) {
    return <Layout varient="regular">Could not find post</Layout>;
  }

  return (
    <Layout varient="regular">
      <Text color="gray.500" fontWeight="light" letterSpacing="wide">
        {data.post.creator.username}
      </Text>
      <Heading mb={5}>{data.post.title}</Heading>
      <p>{data.post.content}</p>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
