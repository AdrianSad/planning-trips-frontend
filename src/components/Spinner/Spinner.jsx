import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = ({ visible }) => {
  return (
    visible && (
      <CircularProgress
        size={60}
        sx={{
          position: "absolute",
          zIndex: 10,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    )
  );
};

export default Spinner;
