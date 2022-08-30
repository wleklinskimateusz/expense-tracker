import React from "react";
import { Route, Routes } from "react-router-dom";

import { majorScale, Pane } from "evergreen-ui";
import styled from "styled-components";

import { firebaseAPI } from ".";
import { onAuthStateChanged } from "firebase/auth";

import { LoginPanel, NotLoggedIn } from "./components";
import { UploadPage, Settings } from "./pages";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { userSelector } from "./redux/selectors";
import { setUser } from "./redux/features";

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  onAuthStateChanged(firebaseAPI.auth, (user) =>
    dispatch(
      setUser({
        id: user?.uid,
        displayName: user?.displayName,
        photo: user?.photoURL,
      })
    )
  );

  if (!user.id) {
    return <NotLoggedIn />;
  }

  return (
    <Container margin={majorScale(2)} padding={majorScale(2)}>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <LoginPanel />
    </Container>
  );
};

const Container = styled(Pane)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default App;
