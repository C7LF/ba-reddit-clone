import { Box, IconButton } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeleteButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          icon="edit"
          aria-label="edit post"
          color="lightpurple"
        ></IconButton>
      </NextLink>
      <IconButton
        ml="auto"
        icon="delete"
        aria-label="delete post"
        color="darkred"
        onClick={() => {
          deletePost({ id });
        }}
      ></IconButton>
    </Box>
  );
};
