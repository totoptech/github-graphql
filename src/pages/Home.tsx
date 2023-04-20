import React, { ChangeEvent, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SEARCH_REPOS, SEARCH_USERS } from "../graphql/queries";
import { Repository, User } from "../graphql/generated/gql/graphql";
import { getNodes } from "../utils";

function Home() {
  const [query, setQuery] = useState<string>("");
  const [isUser, setIsUser] = useState<boolean>(false);
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

  return (
    <Box p={4}>
      <Typography mb={4}>Github GraphQL</Typography>
      <Box alignItems="center" display="flex">
        <TextField value={query} onChange={handleChangeQuery} />
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
      <Typography mt={2}>Results</Typography>

      {usersLoading || reposLoading ? (
        <p>Loading...</p>
      ) : (
        <List>
          {isUser
            ? getNodes(usersData)?.map((user: User) => (
                <ListItem key={user.id}>
                  <ListItemText
                    primary={user.name || user.login}
                    secondary={`@${user.login}`}
                  />
                </ListItem>
              ))
            : getNodes(reposData)?.map((repo: Repository) => (
                <ListItem key={repo.id}>
                  <ListItemText primary={repo.name} secondary={repo.url} />
                </ListItem>
              ))}
        </List>
      )}
    </Box>
  );
}

export default Home;
