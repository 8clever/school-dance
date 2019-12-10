import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Class } from "../../server/models/Class";
import { imageStore } from "./ImageStore";

export class ClassStore extends Api<Class> {
  newImages: Blob[] = [];

  endpoint = "/api/v1/class/";

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

decorate(ClassStore, {
  newImages: observable,
  create: action,
  save: action,
  remove: action
});

export const classStore = new ClassStore();
