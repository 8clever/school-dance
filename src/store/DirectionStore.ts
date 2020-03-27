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

  defaults = () => {
    this.item = this.item || {} as any;
    this.item.images = this.item.images || [];
    this.item.submenu = Array.isArray(this.item.submenu) ? this.item.submenu : [];
  }

  create = () => {
    this.item = {
      url: "",
      name: "",
      submenu: [],
      images: [],
      desc: ""
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