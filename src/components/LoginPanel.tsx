import { Button } from "evergreen-ui";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import styled from "styled-components";
import { firebaseAPI } from "..";
import { margin, padding } from "../config/styles";
import { setUser } from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/selectors";
import { ProfileMenu } from "./ProfileMenu";

const isEmpty = (obj: Object) =>
  Object.values(obj)
    .map((item) => item === undefined || item === null)
    .reduce((prev, next) => prev || next, false);

export const LoginPanel = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  useEffect(() => console.log(user));
  onAuthStateChanged(firebaseAPI.auth, (user) =>
    dispatch(
      setUser({
        id: user?.uid,
        displayName: user?.displayName,
        photo: user?.photoURL,
      })
    )
  );
  return (
    <Container>
      {isEmpty(user) ? (
        <Button onClick={firebaseAPI.googleSignIn}>Log In</Button>
      ) : (
        <ProfileMenu />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: ${margin.regular};
  padding: ${padding.regular};
`;
