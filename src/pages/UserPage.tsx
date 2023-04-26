import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { SEARCH_USER_BY_LOGIN } from "../graphql/queries";

function UserPage() {
  const params = useParams();
  const { loading, data } = useQuery(SEARCH_USER_BY_LOGIN, {
    variables: {
      login: params.user || "",
    },
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={30}>
      {loading && <Typography>Loading...</Typography>}
      {data?.user && (
        <>
          <Avatar src={data.user.avatarUrl} />
          {data.user.name && <Typography mt={2}>{data.user.name}</Typography>}
          {data.user.bio && <Typography mt={2}>{data.user.bio}</Typography>}
          <Link href={`https://github.com/${data.user.login}`} my={2}>
            @{data.user.login}
          </Link>
          <Button href="/" variant="outlined">
            Back To Home
          </Button>
        </>
      )}
    </Box>
  );
}

export default UserPage;
