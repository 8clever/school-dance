import _ from "lodash";
import { MongoService } from "./mongo.service";
import { i18n } from "../../models/I18n";

class I18nService extends MongoService<i18n.Localization> {

  collection = "localization";

  edit = this._edit;
  find = this._find;
  remove = this._remove
}

export const i18nService = new I18nService();