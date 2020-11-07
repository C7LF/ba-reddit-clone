import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";

export const useGetPostFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return usePostQuery({
    // If query is invalid, then don't bother execting the query (using pause)
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
