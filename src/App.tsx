import React from "react";
import styled from "styled-components";
import { LoginPanel } from "./components/LoginPanel";

const App = () => {
  return (
    <Container>
      <LoginPanel />
    </Container>
  );
};

const Container = styled.div``;

export default App;
