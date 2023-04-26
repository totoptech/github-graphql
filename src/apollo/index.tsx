import { ApolloClient, InMemoryCache } from "@apollo/client";

process.env.REACT_APP_GITHUB_TOKEN = "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";
export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
