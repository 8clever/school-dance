import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Direction } from "../../server/models/Direction";
import { FilterQuery } from "mongodb";
import { imageStore } from "./ImageStore";

class DirectionStore extends Api {
  direction?: Direction;
  directions?: Direction[];
  newImages: Blob[] = []

  endpoint = "/api/v1/direction/"

  saveDirection = async () => {
    const direction = toJS(this.direction);
    
    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      direction.images.push(_idimage);
    }

    this.newImages = [];
    await this.fetch("editDirection", "POST", direction);
  }

  loadDirection = async (_id: string) => {
    this.direction = {
      name: "",
      images: []
    }
    this.newImages = [];
    if (!_id) return;

    await this.loadDirections({ _id });
    if (this.directions.length) {
      this.direction = this.directions[0];
    }
  }

  loadDirections = async (query?: FilterQuery<Direction>) => {
    const data = await this.fetch("getDireactions", "GET", { query });
    this.directions = data.list;
  }
}

decorate(DirectionStore, {
  direction: observable,
  directions: observable,
  loadDirection: action,
  loadDirections: action
});

export const directionStore = new DirectionStore();