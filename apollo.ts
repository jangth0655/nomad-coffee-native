import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

export const TOKEN = "token";
const LOGGED_IN = "loggedIn";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: string) => {
  await AsyncStorage.multiSet([
    [TOKEN, token],
    [LOGGED_IN, "yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  const keys = [TOKEN, LOGGED_IN];
  await AsyncStorage.multiRemove(keys);
  tokenVar("");
  isLoggedInVar(false);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
