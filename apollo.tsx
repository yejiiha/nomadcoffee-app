import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "https://yejiiha-nomadcoffee-backend.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: {
          keyArgs: false,
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
