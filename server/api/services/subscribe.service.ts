import { ObjectID } from "mongodb";
import { Subscribe } from "../../models/Subscribe";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class SubscribeService extends MongoService<Subscribe> {

  collection = "subscribe";

  edit = async (subscribe: Subscribe) => {
    subscribe.images = subscribe.images.map(i => new ObjectID(i));
    return this._edit(subscribe);
  }

  get = this._find;
  rm = this._remove
}

export const subscribeService = new SubscribeService();