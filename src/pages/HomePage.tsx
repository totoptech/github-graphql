import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { SEARCH_REPOS, SEARCH_USERS } from "../graphql/queries";
import { Repository, User } from "../graphql/generated/gql/graphql";
import { getNodes } from "../utils";
import ListItem from "../components/ListItem";
import { PAGE_ITEMS_COUNT } from "../constants";

function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const [searchUsers, { loading: usersLoading, data: usersData }] =
    useLazyQuery(SEARCH_USERS);
  const [searchRepos, { loading: reposLoading, data: reposData }] =
    useLazyQuery(SEARCH_REPOS);

  const handleSearchUsers = () => {
    searchUsers({ variables: { query } });
    setIsUser(true);
  };

  const handleSearchRepos = () => {
    searchRepos({ variables: { query } });
    setIsUser(false);
  };

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    let newCount;
    // TODO: We can implement pagination by using userCount or repositoryCount here
    if (isUser) {
      newCount = usersData?.search.userCount ?? 0;
    } else {
      newCount = reposData?.search.repositoryCount ?? 0;
    }

    setCount(newCount < 100 ? newCount : 100);
    setPage(1);
  }, [usersData, reposData]);

  const isDataLoaded = (isUser && usersData) || (!isUser && reposData);

  return (
    <Box p={4}>
      <Typography mb={4}>Github GraphQL</Typography>
      <Box alignItems="center" display="flex">
        <TextField
          value={query}
          onChange={handleChangeQuery}
          placeholder="Search user or repository..."
        />
        <Button
          variant="contained"
          onClick={handleSearchUsers}
          sx={{ ml: 2 }}
          disabled={usersLoading}
        >
          Search Users
        </Button>
        <Button
          variant="contained"
          onClick={handleSearchRepos}
          sx={{ ml: 2 }}
          disabled={reposLoading}
        >
          Search Repositories
        </Button>
      </Box>

      {isDataLoaded && (
        <Typography mt={2}>{isUser ? "Users" : "Repositories"}</Typography>
      )}

      {usersLoading || reposLoading ? (
        <p>Loading...</p>
      ) : (
        <List sx={{ maxWidth: 360, bgcolor: "background.paper" }}>
          {isUser
            ? getNodes(usersData)
                ?.slice((page - 1) * PAGE_ITEMS_COUNT, page * PAGE_ITEMS_COUNT)
                .map((user: User) => (
                  <ListItem
                    key={user.id}
                    title={user.name || user.login}
                    desc={`@${user.login}`}
                    avatar={user.avatarUrl}
                    link={user.login}
                  />
                ))
            : getNodes(reposData)
                ?.slice((page - 1) * PAGE_ITEMS_COUNT, page * PAGE_ITEMS_COUNT)
                ?.map((repo: Repository) => (
                  <ListItem
                    key={repo.id}
                    title={repo.name}
                    desc={repo.url}
                    link={repo.nameWithOwner}
                  />
                ))}
        </List>
      )}

      {isDataLoaded && (
        <Pagination
          count={Math.ceil(count / PAGE_ITEMS_COUNT)}
          page={page}
          onChange={handleChangePage}
          sx={{ mt: 3 }}
        />
      )}
    </Box>
  );
}

export default HomePage;
