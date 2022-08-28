import { Dispatch } from "@reduxjs/toolkit";
import Papa from "papaparse";
import { addFile } from "../redux/features/filesSlice";
import { Data } from "../types";

export const createHandleParse =
  (
    files: File[],
    setError: (e: Error | null) => void,
    dispatch: Dispatch,
    setFiles: (f: File[]) => void,
    onClose: () => void
  ) =>
  () => {
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
