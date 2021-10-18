import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import { LOGIN } from "../consts/routes";

const withAuthentication = (Component, props) => (innerProps) => {
  const history = useHistory();
  const userData = useSelector((state) => state.auth.userData);

  const redirectIfNoAuthorization = useCallback(
    (path) => {
      !userData && history.push(path);
    },
    [userData, history]
  );

  useEffect(() => {
    redirectIfNoAuthorization(LOGIN);
  }, [redirectIfNoAuthorization]);

  return userData && <Component {...innerProps} {...props} />;
};

export default withAuthentication;
