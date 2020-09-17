import React from "react";
import NavBar from "../components/NavBar";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/core";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>Hello!</div>
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
    </>
  );
};

// setup Urql provider
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
