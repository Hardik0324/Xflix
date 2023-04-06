import React from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Stack alignItems="center">
        <CircularProgress sx={{ color: "whitesmoke" }} />
        <Typography>Loading</Typography>
      </Stack>
    </Box>
  );
};

export default Loader;