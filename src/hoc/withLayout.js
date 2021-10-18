import React from "react";
import { Layout } from "../components";

export default (Component, stickyTopBar) => (props) =>
  (
    <Layout stickyTopBar={stickyTopBar}>
      <Component {...props} />
    </Layout>
  );
