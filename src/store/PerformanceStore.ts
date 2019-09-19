import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Performance } from "../../server/models/Performance";
import { RootQuerySelector } from "mongodb";
import { imageStore } from "./ImageStore";

class PerformanceStore extends Api<Performance> {

  performance?: Performance;
  performanceList: Performance[] = [];
  newImages: Blob[] = [];

  endpoint = "/api/v1/performance/";

  createPerformance = async (_iddirection: string) => {
    this.performance = {
      name: "",
      description: "",
      _iddirection,
      images: []
    }
    this.newImages = [];
  }

  loadPerformance = async (_id: string) => {
    const data = await this.getItems({ _id });
    this.performance = data.list[0];
  }

  loadPerformanceList = async (query: RootQuerySelector<Performance>) => {
    const data = await this.getItems(query);
    this.performanceList = data.list;
  }

  savePerformance = async () => {
    const ev = toJS(this.performance);
    if (!ev) return;

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      ev.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(ev);;
  }

  rmPerformance = async (_id: string) => {
    return this.removeItem({ _id });
  }
}

decorate(PerformanceStore, {
  performance: observable,
  performanceList: observable,
  createPerformance: action,
  loadPerformance: action,
  loadPerformanceList: action
});

export const performanceStore = new PerformanceStore();
