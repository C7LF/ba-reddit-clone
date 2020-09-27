import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import InputField from "../components/inputField";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();

  const [, createPost] = useCreatePostMutation();
  return (
    <Layout varient="small">
      <Formik
        initialValues={{ title: "", content: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
