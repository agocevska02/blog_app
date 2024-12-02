import { FileResponse } from "../../types/Files";
import { BlogAppClientInstance } from "../rest-client";

export class FileService {
  getFiles = async () => {
    return await BlogAppClientInstance.get<string[]>("files");
  };

  uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return await BlogAppClientInstance.post<FileResponse>("files", formData);
  };

  downloadFile = async (fileName: string) => {
    return await BlogAppClientInstance.download(`files/${fileName}`);
  };
}
