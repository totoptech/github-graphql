import { gql } from "./generated/gql";

// We can implement pagination by using `after` and `startCursor` values but for the sake of time, just retrieved first 100 items.
export const SEARCH_USERS = gql(/* GraphQL */ `
  query SearchUsers($query: String!, $after: String) {
    search(query: $query, type: USER, first: 100, after: $after) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      userCount
      nodes {
        ... on User {
          id
          login
          name
          avatarUrl
        }
      }
    }
  }
`);

export const SEARCH_REPOS = gql(/* GraphQL */ `
  query SearchRepos($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 100, after: $after) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          url
          nameWithOwner
        }
      }
    }
  }
`);

export const SEARCH_USER_BY_LOGIN = gql(/* GraphQL */ `
  query SearchUserByLogin($login: String!) {
    user(login: $login) {
      id
      login
      name
      avatarUrl
      bio
    }
  }
`);

export const SEARCH_REPOSITORY_BY_NAME_AND_OWNER = gql(/* GraphQL */ `
  query SearchRepositoryByNameAndOwner($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      url
      nameWithOwner
      description
    }
  }
`);