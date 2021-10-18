import React from "react";
import { TopBar } from "../index";
import Typography from "@material-ui/core/Typography";
import styles from "./Layout.module.css";

const Layout = ({ stickyTopBar, children }) => {
  return (
    <main>
      <TopBar stickyTopBar={stickyTopBar} />
      {children}
      <div className={styles.footer}>
        <Typography variant="title">
          Planning Trips Application 2021 - Adrian Sadurski
        </Typography>
      </div>
    </main>
  );
};

export default Layout;
