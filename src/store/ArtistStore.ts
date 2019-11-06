import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Artist } from "../../server/models/Artist";
import { imageStore } from "./ImageStore";

export class ArtistStore extends Api<Artist> {
  newImages: Blob[] = [];

  endpoint = "/api/v1/artist/";

  create = async () => {
    this.item = {
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

decorate(ArtistStore, {
  newImages: observable,
  create: action,
  save: action,
  remove: action
});

export const artistStore = new ArtistStore();
