import { ObjectID } from "mongodb";
import _ from "lodash";
import { MongoService } from "./mongo.service";
import { PieceOfNews } from "../../models/PieceOfNews";
import moment from "moment";

class PieceOfNewsService extends MongoService<PieceOfNews> {

  collection = "pieceofnews";

  editPieceOfNews = async (data: PieceOfNews) => {
    data._dt = moment(data._dt).toDate();
    data.images = data.images.map(i => new ObjectID(i));
    return this._edit(data);
  }

  getNews = this._find;
  rmPieceOfNews= this._remove
}

export const pieceOfNewsService = new PieceOfNewsService();