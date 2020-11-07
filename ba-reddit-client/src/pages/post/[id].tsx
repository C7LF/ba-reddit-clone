import { Divider, Heading, IconButton, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

export const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl()
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
