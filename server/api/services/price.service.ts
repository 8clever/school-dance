import { Price } from "../../models/Price";
import _ from "lodash";
import { MongoService } from "./mongo.service";
import { ObjectID } from "bson";
import { RootQuerySelector } from "mongodb";

class PriceService extends MongoService<Price> {
  collection = "price";

  edit = async (price: Price) => {
    price._idsubscribe = new ObjectID(price._idsubscribe);
    return this._edit(price);
  };
  
  get = async (query: RootQuerySelector<Price>) => {
    if (query._idsubscribe) {
      query._idsubscribe = new ObjectID(query._idsubscribe);
    }
    return this._find(query);
  }
  
  rm = this._remove
}

export const priceService = new PriceService();