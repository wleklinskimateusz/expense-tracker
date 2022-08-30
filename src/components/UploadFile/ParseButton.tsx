import { Button } from "evergreen-ui";
import Papa from "papaparse";
import React, { FC } from "react";
import { addFile } from "../../redux/features";
import { useAppDispatch } from "../../redux/hooks";
import { Data } from "../../types";

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
  const dispatch = useAppDispatch();
  const handleParse = () => {
    files.forEach((file) => {
      if (!file) return setError(new Error("Enter a valid file"));
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
      reader.readAsText(file);
    });
    setFiles([]);
    onClose();
  };
  return (
    <Button intent="success" onClick={handleParse}>
      Parse
    </Button>
  );
};
