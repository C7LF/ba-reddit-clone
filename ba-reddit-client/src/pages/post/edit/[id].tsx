import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import InputField from "../../../components/inputField";
import { Layout } from "../../../components/Layout";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";

const EditPost = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();

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
          //   const { error } = await createPost({ input: values });
          //   if (!error) {
          //     router.push("/");
          //   }
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
