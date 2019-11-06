import { ObjectID } from "mongodb";
import { Artist } from "../../models/Artist";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class ArtistService extends MongoService<Artist> {

  collection = "artist";

  editArtist = async (data: Artist) => {
    data.images = data.images.map(i => new ObjectID(i));
    return this._edit(data);
  }

  getArtist = this._find;
  rmArtist = this._remove
}

export const artistService = new ArtistService();