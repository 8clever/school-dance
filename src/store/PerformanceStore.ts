import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Performance } from "../../server/models/Performance";
import { imageStore } from "./ImageStore";

export class PerformanceStore extends Api<Performance> {

  newImages: Blob[] = [];

  endpoint = "/api/v1/performance/";

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

decorate(PerformanceStore, {
  create: action,
  newImages: observable,
  remove: action
});

export const performanceStore = new PerformanceStore();
