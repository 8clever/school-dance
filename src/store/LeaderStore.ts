import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Leader } from "../../server/models/Leaders";
import { imageStore } from "./ImageStore";

export class LeaderStore extends Api<Leader> {

  newImages: Blob[] = [];

  endpoint = "/api/v1/leader/";

  create = async () => {
    this.item = {
      fullName: "",
      description: "",
      images: []
    }
    this.newImages = [];
  }

  save = async () => {
    const leader = toJS(this.item);
    if (!leader) return;

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      leader.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(leader);;
  }
}

decorate(LeaderStore, {
  create: action,
  save: action,
  newImages: observable
});

export const leaderStore = new LeaderStore();
