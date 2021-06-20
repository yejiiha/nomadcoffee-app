import React, { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { SEE_ME } from "../components/Queries";
import { me } from "../src/__generated__/me";

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(SEE_ME, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data };
}

export default useUser;
