import { majorScale, Pane } from "evergreen-ui";
import React from "react";
import styled from "styled-components";
import { LoginPanel } from "./components/LoginPanel";
import { userSelector } from "./redux/selectors";
import { firebaseAPI } from ".";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/features/userSlice";
import { NotLoggedIn } from "./components/NotLoggedIn";
import { UploadPage } from "./pages/UploadPage";
import { Route, Routes } from "react-router-dom";

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
