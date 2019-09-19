import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Event } from "../../server/models/Event";
import { RootQuerySelector } from "mongodb";

class EventStore extends Api<Event> {

  event?: Event;
  eventList: Event[] = [];

  endpoint = "/api/v1/event/";

  createEvent = async (_idperformance: string) => {
    this.event = {
      _idperformance,
      dt: new Date()
    }
  }

  loadEvent = async (_id: string) => {
    const data = await this.getItems({ _id });
    this.event = data.list[0];
  }

  loadEventList = async (query: RootQuerySelector<Event>) => {
    const data = await this.getItems(query);
    this.eventList = data.list;
  }

  saveEvent = async () => {
    const ev = toJS(this.event);
    if (!ev) return;
    return this.editItem(ev);
  }

  rmEvent = async (_id: string) => {
    return this.removeItem({ _id });
  }
}

decorate(EventStore, {
  event: observable,
  eventList: observable,
  createEvent: action,
  loadEvent: action,
  loadEventList: action
});

export const eventStore = new EventStore();
