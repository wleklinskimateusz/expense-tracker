import { toaster } from "evergreen-ui";
import React, { useEffect } from "react";
import styled from "styled-components";
import { firebaseAPI } from "..";
import { margin, padding } from "../config/styles";
import { ProfileMenu } from "./ProfileMenu";

export const LoginPanel = () => {
  const error = firebaseAPI.authError || (firebaseAPI.error as Error);
  useEffect(() => {
    if (error) {
      toaster.danger(error.message);
    }
  }, [error]);
  return (
    <Container>
      <ProfileMenu />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: ${margin.regular};
  padding: ${padding.regular};
`;
