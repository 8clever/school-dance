import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Leader } from "../../server/models/Leaders";
import { RootQuerySelector } from "mongodb";
import { imageStore } from "./ImageStore";

export class LeaderStore extends Api<Leader> {

  leader?: Leader;
  leaderList: Leader[] = [];
  newImages: Blob[] = [];

  endpoint = "/api/v1/leader/";

  createLeader = async () => {
    this.leader = {
      fullName: "",
      description: "",
      images: []
    }
    this.newImages = [];
  }

  loadLeader = async (_id: string) => {
    const data = await this.getItems({ _id });
    this.leader = data.list[0];
  }

  loadLeaderList = async (query: RootQuerySelector<Performance>) => {
    const data = await this.getItems(query);
    this.leaderList = data.list;
  }

  saveLeader = async () => {
    const leader = toJS(this.leader);
    if (!leader) return;

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      leader.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(leader);;
  }

  rmLeader = async (_id: string) => {
    return this.removeItem({ _id });
  }
}

decorate(LeaderStore, {
  leader: observable,
  leaderList: observable,
  createLeader: action,
  loadLeader: action,
  loadLeaderList: action
});

export const leaderStore = new LeaderStore();
