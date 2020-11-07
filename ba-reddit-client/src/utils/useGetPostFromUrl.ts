import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const router = useRouter();
  const intId = useGetIntId();
  return usePostQuery({
    // If query is invalid, then don't bother execting the query (using pause)
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
