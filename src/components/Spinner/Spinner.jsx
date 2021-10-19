import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = ({ visible }) => {
  return (
    visible && (
      <CircularProgress
        size={60}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    )
  );
};

export default Spinner;
