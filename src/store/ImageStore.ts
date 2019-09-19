import { Api } from "./Api";

class ImageStore extends Api<any> {
  endpoint = "/api/v1/image/"

  upload = async (blob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("image", blob);
    const _idimage: string = await this.fetch("upload", "PUT", formData);
    return _idimage;
  }
}

export const imageStore = new ImageStore();