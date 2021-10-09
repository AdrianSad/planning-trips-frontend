import React from "react";
import styles from "./GradientButton.module.css";
import { Button } from "@material-ui/core";

const GradientButton = ({ children, ...props }) => {
  return (
    <Button {...props} className={styles.btnGrad}>
      {children}
    </Button>
  );
};

export default GradientButton;
