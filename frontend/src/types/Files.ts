export type FileResponse = {
  fileUri: string;
};

export enum FileStatus {
  CREATED = "CREATED",
  EXIST = "EXIST",
  FAILED = "FAILED",
}
