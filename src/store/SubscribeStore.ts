import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Subscribe } from "../../server/models/Subscribe";
import { imageStore } from "./ImageStore";

export class SubscribeStore extends Api<Subscribe> {
  newImages: Blob[] = []

  endpoint = "/api/v1/subscribe/"

  save = async () => {
    const subscribe = toJS(this.item);

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      subscribe.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(subscribe);
  }

  create = () => {
    this.item = {
      name: "",
      images: []
    }
    this.newImages = [];
  }
}

decorate(SubscribeStore, {
  create: action,
});

export const subscribeStore = new SubscribeStore();