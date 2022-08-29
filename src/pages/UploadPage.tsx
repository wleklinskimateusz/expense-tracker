import { Button, SearchInput } from "evergreen-ui";
import React, { useState } from "react";
import { DataTable } from "../components/DataTable";
import { Popup } from "../components/Popup";
import { UploadFile } from "../components/UploadFile";
import { useAppSelector } from "../redux/hooks";
import { filesSelector } from "../redux/selectors";

const sizeToString = (size: number) => {
  if (size < 1000) return `${size} B`;
  if (size < 1000000) return `${size / 1000} kB`;
  if (size < 1000000000) return `${size / 1000000} MB`;
  return `${size / 1000000000} GB`;
};

export const UploadPage = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const closeUploads = () => setIsUploadOpen(false);
  const files = useAppSelector(filesSelector);
  return (
    <>
      <SearchInput />
      <DataTable
        data={files.map(({ title, modified, size }) => ({
          title,
          modified: new Date(modified).toString(),
          size: sizeToString(size),
        }))}
        setSelected={(idx) => console.table(files[idx].data)}
      />
      <Popup isOpen={isUploadOpen} close={closeUploads}>
        <UploadFile onClose={closeUploads} />
      </Popup>
      <Button onClick={() => setIsUploadOpen(true)}>Upload Files</Button>
    </>
  );
};
