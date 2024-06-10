import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";

const PaginationControlled = ({ page, count, handleChange }) => {
  return (
    <Stack spacing={3}>
      <Typography>Page : {page}</Typography>
      <Pagination onChange={handleChange} count={count} color="error" />
    </Stack>
  );
};

export default PaginationControlled;
