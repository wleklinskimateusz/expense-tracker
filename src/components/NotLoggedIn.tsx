import React from "react";
import { firebaseAPI } from "..";

import { Button } from "evergreen-ui";

export const NotLoggedIn = () => {
  return <Button onClick={firebaseAPI.googleSignIn}>Login</Button>;
};
