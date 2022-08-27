import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  FC,
} from "react";
import {
  Alert,
  Button,
  FileCard,
  FileRejection,
  FileRejectionReason,
  FileUploader,
  majorScale,
  MimeType,
  Pane,
  rebaseFiles,
  toaster,
} from "evergreen-ui";
import Papa from "papaparse";
import { addFile } from "../redux/features/filesSlice";
import { useAppDispatch } from "../redux/hooks";
import { Data } from "../types";

export const UploadFile: FC<{ onClose: () => void }> = ({ onClose }) => {
  const acceptedMimeTypes = useMemo(() => [MimeType.csv], []);
  const maxFiles = 5;
  const maxSizeInBytes = 50 * 1024 ** 2; // 50 MB
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  useEffect(() => {
    if (error) {
      toaster.danger(error.message);
    }
  }, [error]);
  const values = useMemo(
    () => [
      ...files,
      ...fileRejections.map((fileRejection) => fileRejection.file),
    ],
    [files, fileRejections]
  );
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
  const handleRemove = useCallback(
    (file: File) => {
      const updatedFiles = files.filter(
        (existingFile) => existingFile !== file
      );
      const updatedFileRejections = fileRejections.filter(
        (fileRejection) => fileRejection.file !== file
      );

      // Call rebaseFiles to ensure accepted + rejected files are in sync (some might have previously been
      // rejected for being over the file count limit, but might be under the limit now!)
      const { accepted, rejected } = rebaseFiles(
        [
          ...updatedFiles,
          ...updatedFileRejections.map((fileRejection) => fileRejection.file),
        ],
        { acceptedMimeTypes, maxFiles, maxSizeInBytes }
      );
      setFiles(accepted);
      setFileRejections(rejected);
    },
    [acceptedMimeTypes, files, fileRejections, maxFiles, maxSizeInBytes]
  );

  const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
  const fileCountError = `You can upload up to 5 files. Please remove ${fileCountOverLimit} ${
    fileCountOverLimit === 1 ? "file" : "files"
  }.`;

  return (
    <Pane maxWidth={654} margin={majorScale(2)}>
      <FileUploader
        acceptedMimeTypes={acceptedMimeTypes}
        label="Upload Files"
        description="You can upload up to 5 files. Files can be up to 50MB. You can upload only .csv formats"
        disabled={files.length + fileRejections.length >= maxFiles}
        maxSizeInBytes={maxSizeInBytes}
        maxFiles={maxFiles}
        onAccepted={setFiles}
        onRejected={setFileRejections}
        renderFile={(file, index) => {
          const { name, size, type } = file;
          const renderFileCountError = index === 0 && fileCountOverLimit > 0;

          // We're displaying an <Alert /> component to aggregate files rejected for being over the maxFiles limit,
          // so don't show those errors individually on each <FileCard />
          const fileRejection = fileRejections.find(
            (fileRejection) =>
              fileRejection.file === file &&
              fileRejection.reason !== FileRejectionReason.OverFileLimit
          );
          const { message } = fileRejection || {};

          return (
            <Fragment key={`${file.name}-${index}`}>
              {renderFileCountError && (
                <Alert
                  intent="danger"
                  marginBottom={majorScale(2)}
                  title={fileCountError}
                />
              )}
              <FileCard
                isInvalid={fileRejection != null}
                name={name}
                onRemove={() => handleRemove(file)}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
              />
            </Fragment>
          );
        }}
        values={values}
      />
      <Button intent="success" onClick={handleParse}>
        Parse
      </Button>
    </Pane>
  );
};
