import { Config } from "../../models/Config";
import { MongoService } from "./mongo.service";
import _ from "lodash";

class ConfigService extends MongoService<Config> {
  collection = "config";
  editConfig = this._edit;

  getConfig = async () => {
    const data = await this._find({});
    const config = data.list[0] || {} as Config;
    
    // defaults
    config.calendarTimeRange = config.calendarTimeRange || {
      from: 6,
      to: 23
    }

    return config;
  }
}

export const configService = new ConfigService();