import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { SEARCH_REPOSITORY_BY_NAME_AND_OWNER } from "../graphql/queries";

function RepositoryPage() {
  const params = useParams();
  const { loading, data } = useQuery(SEARCH_REPOSITORY_BY_NAME_AND_OWNER, {
    variables: {
      name: params.repo || "",
      owner: params.user || "",
    },
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={30}>
      {loading && <Typography>Loading...</Typography>}
      {data?.repository && (
        <>
          <Typography>{data.repository.name}</Typography>
          {data.repository.description && (
            <Typography mt={2}>{data.repository.description}</Typography>
          )}
          <Link href={data.repository.url} my={2}>
            {data.repository.url}
          </Link>
          <Button href="/" variant="outlined">
            Back To Home
          </Button>
        </>
      )}
    </Box>
  );
}

export default RepositoryPage;
