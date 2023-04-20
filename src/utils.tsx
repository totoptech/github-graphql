import {
  SearchReposQuery,
  SearchUsersQuery,
} from "./graphql/generated/gql/graphql";

export const getNodes = (
  data: SearchUsersQuery | SearchReposQuery | undefined
): any => {
  return data?.search.nodes?.filter(
    (node: any) => node && Object.keys(node).length > 0
  );
};
