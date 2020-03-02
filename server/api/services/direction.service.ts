import { ObjectID } from "mongodb";
import { Direction } from "../../models/Direction";
import { MongoService } from "./mongo.service";
import _ from "lodash";

class DirectionService extends MongoService<Direction> {

  collection = "direction";

  editDirection = async (direction: Direction) => {
    direction.images = direction.images.map(img => new ObjectID(img));
    direction.submenu = direction.submenu.map(sub => {
      return {
        ...sub,
        images: sub.images.map(img => new ObjectID(img))
      }
    })
    return this._edit(direction);
  }

  getDirections = this._find;
  rmDirection = this._remove;
}

export const directionService = new DirectionService();