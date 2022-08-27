import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FileState } from "../../types";

interface FilesState {
  files: FileState[];
}

const initialState: FilesState = { files: [] };

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<FileState>) => {
      state.files = [...state.files, action.payload];
    },
  },
});

export const { addFile } = fileSlice.actions;

export default fileSlice.reducer;
