import { decorate, observable, action } from "mobx";
import _ from "lodash";

interface Notification {
  id?: number;
  title: string;
  message: string;
  duration?: number;
}

class NotifStore {
  items: { [key: number]: Notification } = {};
  id: number = 0;

  addNotif = (notif: Notification) => {
    this.id += 1;
    const i = {
      id: this.id,
      ...notif
    }
    this.items = {};
    this.items[this.id] = i;

    if (notif.duration) {
      setTimeout(() => {
        this.rmNotif(i.id);
      }, notif.duration * 1000);
    }
  }

  rmNotif (id: number) {
    delete this.items[id];
  }
}

decorate(NotifStore, {
  items: observable,
  addNotif: action,
  rmNotif: action
});

export const notifStore = new NotifStore();