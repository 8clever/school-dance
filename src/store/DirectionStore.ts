import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Direction } from "../../server/models/Direction";
import { FilterQuery } from "mongodb";

class DirectionStore extends Api {
  direction?: Direction;
  directions?: Direction[];
  newImages: Blob[] = []

  endpoint = "/api/v1/direction/"

  uploadImage = async (blob: Blob) => {
    if (!this.direction) {
      return;
    }

    const formData = new FormData();
    formData.append("image", blob);
    const _idimage: string = await this.fetch("image", "PUT", formData);
    this.direction.images.push(_idimage);
  }

  saveDirection = async () => {
    const direction = toJS(this.direction);
    for(const image of this.newImages) {
      await this.uploadImage(image);
    }
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
  uploadImage: action,
  loadDirection: action,
  loadDirections: action
});

export const directionStore = new DirectionStore();