import { majorScale, Pane, SearchInput } from "evergreen-ui";
import React from "react";
import styled from "styled-components";
import { DataTable } from "./components/DataTable";
import { UploadFile } from "./components/UploadFile";
import { LoginPanel } from "./components/LoginPanel";
import { Popup } from "./components/Popup";

const App = () => {
  return (
    <Container margin={majorScale(2)} padding={majorScale(2)}>
      <SearchInput />
      <DataTable
        data={[
          {
            firstName: "Obi Wan",
            lastName: "Kenobi",
            price: "45.54",
            realPrice: "125",
            status: "Jedi",
          },
          {
            firstName: "Darth",
            lastName: "Vader",
            price: "73.23",
            realPrice: "23.4",
            status: "It's complicated",
          },
          {
            firstName: "Luke",
            lastName: "Skywalker",
            price: "18.2",
            realPrice: "9",
            status: "Jedi",
          },
        ]}
      />
      <Popup>
        <UploadFile />
      </Popup>
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
