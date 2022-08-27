import { Button, majorScale, Pane, SearchInput } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataTable } from "./components/DataTable";
import { UploadFile } from "./components/UploadFile";
import { LoginPanel } from "./components/LoginPanel";
import { Popup } from "./components/Popup";
import { useSelector } from "react-redux";
import { filesSelector } from "./redux/selectors";

const sizeToString = (size: number) => {
  if (size < 1000) return `${size} B`;

  if (size < 1000000) return `${size / 1000} kB`;
  if (size < 1000000000) return `${size / 1000000} MB`;
  return `${size / 1000000000} GB`;
};

const App = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const files = useSelector(filesSelector);
  useEffect(() => {
    if (selected !== null) console.table(files[selected].data);
  });
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const closeUploads = () => setIsUploadOpen(false);

  return (
    <Container margin={majorScale(2)} padding={majorScale(2)}>
      <SearchInput />
      <DataTable
        data={files.map(({ title, modified, size }) => ({
          title,
          modified: new Date(modified).toString(),
          size: sizeToString(size),
        }))}
        setSelected={setSelected}
      />
      <Popup btnText="Upload Files" isOpen={isUploadOpen} close={closeUploads}>
        <UploadFile onClose={closeUploads} />
      </Popup>
      <Button onClick={() => setIsUploadOpen(true)}>Upload Files</Button>
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
