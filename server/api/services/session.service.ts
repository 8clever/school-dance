import { Session } from "../../models/Session";
import { ObjectID } from "mongodb";
import { generateHash } from "./helpers";
import { mongo } from "../../common/db";
import { MongoService } from "./mongo.service";

class SessionService extends MongoService<Session> {

  collection = "session";

  getSession = async (token: string) => {
    const data = await this._find({ token });
    return data.list[0];
  }

  addSession = async (_iduser: ObjectID | string) => {
    const session: Session = {
      _iduser: new ObjectID(_iduser),
      _dt: new Date(),
      token: generateHash(Math.random().toString())
    }

    await this._edit(session);
    return session.token;
  }

  rmSession = async (token: string) => {
    await this._remove({ token });
  }
}

export const sessionService = new SessionService();