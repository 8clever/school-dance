import { Config } from "../../models/Config";
import { MongoService } from "./mongo.service";
import _ from "lodash";
import { ObjectID } from "mongodb";

class ConfigService extends MongoService<Config> {
  collection = "config";
  editConfig = async (config: Config) => {
    config.homeCarousel = config.homeCarousel.map(img => new ObjectID(img));
    return this._edit(config);
  };

  getConfig = async () => {
    const data = await this._find({});
    const config = data.list[0] || {} as Config;
    
    // defaults
    config.calendarTimeRange = config.calendarTimeRange || {
      from: 6,
      to: 23
    }

    config.homeCarousel = config.homeCarousel || [];

    config.homePageTitle = config.homePageTitle || "Studio Context Диана Вишнева";

    return config;
  }
}

export const configService = new ConfigService();