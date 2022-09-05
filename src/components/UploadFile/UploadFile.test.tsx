import React from "react";
import { screen } from "@testing-library/react";
import { UploadFile } from "./UploadFile";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../redux/test-utils";

describe(`<${UploadFile} />`, () => {
  const setup = () => {
    renderWithProviders(<UploadFile onClose={() => {}} />);
    const title = screen.getByText("Upload Files");
    const description = screen.getByText(
      "You can upload up to 5 files. Files can be up to 50MB. You can upload only .csv formats"
    );
    const uploadButton = screen.getByText("or drag files here");
    const fileUpload =
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByRole("input")?.firstElementChild as HTMLElement;
    if (fileUpload === null) throw TypeError("No Input Found");
    return { title, description, uploadButton, fileUpload };
  };

  it("Render Component", () => {
    const { title, description, uploadButton } = setup();
    expect(title).toBeInTheDocument();

    expect(description).toBeInTheDocument();

    expect(uploadButton).toBeInTheDocument();
  });

  it("Upload file", async () => {
    const fakeFile = new File(["hello"], "hello.csv", { type: "csv" });
    const { fileUpload } = setup();
    userEvent.upload(fileUpload, fakeFile);
    const uploads = await screen.findAllByTestId("file-uploaded");
    expect(uploads).toHaveLength(1);
    const hello = screen.getByText("hello.csv");
    expect(hello).toBeInTheDocument();
  });

  it("Upload multiple files", async () => {
    const fakeFile = new File(["hello"], "hello.csv", { type: "csv" });
    const fakeFile2 = new File(["there"], "there.csv", { type: "csv" });
    const { fileUpload } = setup();
    userEvent.upload(fileUpload, [fakeFile, fakeFile2]);
    const uploads = await screen.findAllByTestId("file-uploaded");
    expect(uploads).toHaveLength(2);
  });
});
