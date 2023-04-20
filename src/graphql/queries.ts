import { gql } from "./generated/gql";

export const SEARCH_USERS = gql(/* GraphQL */ `
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 10) {
      nodes {
        ... on User {
          id
          login
          name
        }
      }
    }
  }
`);

export const SEARCH_REPOS = gql(/* GraphQL */ `
  query SearchRepos($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          url
        }
      }
    }
  }
`);
