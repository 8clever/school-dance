import { Service } from "../../models/Service";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class ServiceService extends MongoService<Service> {
  collection = "service";
  edit = this._edit;
  find = this._find;
  remove = this._remove;
}

export const serviceService = new ServiceService();