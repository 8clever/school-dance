import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { imageStore } from "./ImageStore";
import { PieceOfNews } from "../../server/models/PieceOfNews";

export class PieceOfNewsStore extends Api<PieceOfNews> {
  newImages: Blob[] = [];

  endpoint = "/api/v1/pieceofnews/";

  create = async () => {
    this.item = {
      _dt: new Date(),
      name: "",
      description: "",
      images: []
    }
    this.newImages = [];
  }

  save = async () => {
    const data = toJS(this.item);
    if (!data) return;

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      data.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(data);;
  }

  remove = async (_id: string) => {
    return this.removeItem({ _id });
  }
}

decorate(PieceOfNewsStore, {
  newImages: observable,
  create: action,
  save: action,
  remove: action
});

export const pieceOfNewsStore = new PieceOfNewsStore();
