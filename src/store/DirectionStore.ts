import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Direction } from "../../server/models/Direction";
import { imageStore } from "./ImageStore";

export class DirectionStore extends Api<Direction> {
  newImages: Blob[] = []

  endpoint = "/api/v1/direction/"

  save = async () => {
    const direction = toJS(this.item);

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      direction.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(direction);
  }

  create = () => {
    this.item = {
      name: "",
      shortName: "",
      images: [],
      desc: "",
      schedule: [],
      submenu: {
        type: "performance",
        items: []
      }
    }
    this.newImages = [];
  }
}

decorate(DirectionStore, {
  save: action,
  create: action,
  newImages: observable
});

export const directionStore = new DirectionStore();