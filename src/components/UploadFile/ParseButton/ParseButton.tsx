import { Button } from "evergreen-ui";
import Papa from "papaparse";
import React, { FC, useState } from "react";
import { addFile } from "../../../redux/features";
import { useAppDispatch } from "../../../redux/hooks";
import { Data, Status } from "../../../types";

interface Props {
  files: File[];
  setError: (e: Error | null) => void;
  onClose: () => void;
  setFiles: (f: File[]) => void;
}

export const ParseButton: FC<Props> = ({
  files,
  setError,
  onClose,
  setFiles,
}) => {
  const [status, setStatus] = useState<Status>(Status.Ready);
  const dispatch = useAppDispatch();
  const handleParse = () => {
    setStatus(Status.Loading);
    files.forEach((file) => {
      if (!file) {
        setStatus(Status.Error);
        return setError(new Error("Enter a valid file"));
      }
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        if (target === null) return;
        const csv = Papa.parse<Data>(target.result as string, { header: true });
        const parsedData = csv?.data;
        dispatch(
          addFile({
            title: file.name,
            data: parsedData,
            modified: file.lastModified,
            size: file.size,
          })
        );
      };
      reader.onerror = () => setStatus(Status.Error);
      reader.readAsText(file);
    });
    setFiles([]);
    onClose();
    setStatus(Status.Done);
  };
  const text: { [key in Status]: string } = {
    [Status.Ready]: "Parse",
    [Status.Loading]: "Parsing",
    [Status.Error]: "Parsing Failed",
    [Status.Done]: "Parsed",
  };
  return (
    <Button intent="success" onClick={handleParse}>
      {text[status]}
    </Button>
  );
};

ParseButton.displayName = "ParseButton";
