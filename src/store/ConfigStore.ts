import { toJS, decorate, action } from "mobx";
import { Api } from "./Api";
import { Config } from "../../server/models/Config";
import { notifStore } from "./NotifStore";
import { imageStore } from "./ImageStore";

export class ConfigStore extends Api<Config> {
  newImages: Blob[] = []

  endpoint = "/api/v1/config/"

  validate = () => {
    if (this.item && this.item.calendarTimeRange) {

      if (this.item.calendarTimeRange.from < 0) {
        throw new Error("Время начала не может быть меньше 0");
      }

      if (this.item.calendarTimeRange.to > 23) {
        throw new Error("Время конца не может быть больше 23");
      }

      if (
        this.item.calendarTimeRange.from >= this.item.calendarTimeRange.to ||
        (this.item.calendarTimeRange.to - this.item.calendarTimeRange.from) < 2
      ) {
        throw new Error("Минимальный диапазон 2 часа")
      }
    }
  }

  save = async () => {

    try {
      this.validate();
    } catch (err) {
      notifStore.addNotif({
        message: err.message,
        title: "Ошибка валидации",
        duration: 5
      });
      return;
    }

    const item = toJS(this.item);

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      item.homeCarousel.push(_idimage);
    }
    
    this.newImages = [];
    const _id = await this.editItem(item);
    this.item._id = this.item._id || _id;
    return _id;
  }

  getConfig = async () => {
    this.item = await this.fetch("main", "GET");
  }
}

decorate(ConfigStore, {
  save: action,
  getConfig: action
});

export const configStore = new ConfigStore();