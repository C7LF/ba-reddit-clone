import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Heading, Link, Spinner } from "@chakra-ui/core";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout varient="regular">
      <Heading>Hello!</Heading>
      <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink>
      <br />
      {!data ? (
        <Spinner />
      ) : (
        data.posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
          </div>
        ))
      )}
    </Layout>
  );
};

// setup Urql provider
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
