import { Data } from "./Data";

export interface FileState {
  title: string;
  data: Data[];
  modified: number;
  size: number;
}
