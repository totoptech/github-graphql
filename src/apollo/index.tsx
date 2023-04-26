import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer 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`,
  },
});
