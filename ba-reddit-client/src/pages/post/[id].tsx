import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
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

  return <Layout varient="regular">{data?.post?.title}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
