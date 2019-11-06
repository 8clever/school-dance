import { ObjectID } from "mongodb";
import { Direction } from "../../models/Direction";
import { MongoService } from "./mongo.service";
import _ from "lodash";

class DirectionService extends MongoService<Direction> {

  collection = "direction";

  editDirection = async (direction: Direction) => {
    direction.images = direction.images.map(img => new ObjectID(img));
    direction.submenu.items = direction.submenu.items.map(_id => new ObjectID(_id));
    return this._edit(direction);
  }

  getDirections = this._find;
  rmDirection = this._remove;
}

export const directionService = new DirectionService();