import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { DirectionEvent } from "../../server/models/DirectionEvent";
import { FilterQuery } from "mongodb";

class DirectionEventStore extends Api<DirectionEvent> {

  directionEvent?: DirectionEvent;
  directionEvents: DirectionEvent[] = [];

  endpoint = "/api/v1/direction-event/";

  createDirectionEvent = async (_iddirection: string) => {
    this.directionEvent = {
      name: "",
      description: "",
      _iddirection,
      dt: new Date()
    }
  }

  loadDirectionEvent = async (_id: string) => {
    const data = await this.getItems({ _id });
    this.directionEvent = data.list[0];
  }

  loadDirectionEvents = async (query: FilterQuery<DirectionEvent>) => {
    const data = await this.getItems(query);
    this.directionEvents = data.list;
  }

  saveDirectionEvent = async () => {
    const ev = toJS(this.directionEvent);
    if (!ev) return;

    return this.fetch("editDirectionEvent", "POST", ev);
  }

  rmDirectionEvent = async (_id: string) => {
    await this.fetch("rmDirectionEvent", "GET", { _id });
  }
}

decorate(DirectionEventStore, {
  directionEvent: observable,
  directionEvents: observable,
  createDirectionEvent: action,
  loadDirectionEvent: action,
  loadDirectionEvents: action
});

export const directionEventStore = new DirectionEventStore();
