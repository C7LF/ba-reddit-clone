import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  // If not logged in redirect user to login page
  useEffect(() => {
    if (!fetching && !data?.me) {
      // store query parameter in URL
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, fetching]);
};
