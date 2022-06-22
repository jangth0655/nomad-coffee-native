import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { USER_FRAGMENT } from "../fragment";
import { User } from "../interface";

const ME_QUERY = gql`
  ${USER_FRAGMENT}
  query me {
    me {
      name
      email
      githubUsername
      ...UserFragment
    }
  }
`;

interface UserQuery {
  me: User;
}

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<UserQuery>(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data && !data.me) {
      logUserOut();
    }
  }, []);

  return { user: data?.me, loading: !data && !error, error };
};

export default useUser;
