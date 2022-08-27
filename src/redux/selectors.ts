import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user;
export const filesSelector = (state: RootState) => state.files;
