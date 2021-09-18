import React from "react";
import { Layout } from "../components";

export default (Component) => (props) =>
  (
    <Layout>
      <Component {...props} />
    </Layout>
  );
