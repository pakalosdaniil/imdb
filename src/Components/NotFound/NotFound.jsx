import React from "react";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{ bgcolor: grey[200] }}
      flexWrap={"wrap"}
      justifyContent={"center"}
      height={"100%"}
      padding={"30px"}
      display={"flex"}
      flexDirection={"column"}
      textAlign={"center"}
      style={{ height: "700px" }}>
      <h2>404 Page is not found</h2>
    </Box>
  );
};

export default NotFound;
