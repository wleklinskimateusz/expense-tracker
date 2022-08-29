import { Button } from "evergreen-ui";
import React from "react";
import { firebaseAPI } from "..";

export const NotLoggedIn = () => {
  return <Button onClick={firebaseAPI.googleSignIn}>Login</Button>;
};
