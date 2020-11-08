import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import InputField from "../../../components/inputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return <Layout varient="regular">Loading...</Layout>;
  }

  if (!data?.post) {
    return <Layout varient="regular">Could not find post</Layout>;
  }

  return (
    <Layout varient="small">
      <Formik
        initialValues={{ title: data.post.title, content: data.post.content }}
        onSubmit={async (values) => {
          await updatePost({ id: intId, ...values });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={5}>
              <InputField
                isTextArea
                name="content"
                placeholder="Enter your post content..."
                label="Body"
              />
            </Box>
            <Button
              mt={5}
              isLoading={isSubmitting}
              type="submit"
              variantColor="purple"
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
