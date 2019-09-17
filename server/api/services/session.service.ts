import { Session } from "../../models/Session";
import { ObjectID } from "mongodb";
import { generateHash } from "./hepers";
import { mongo } from "../../common/db";

export const COLLECTION = "session";

class SessionService {

  getSession = async (token: string) => {
    const collection = await mongo.db.collection(COLLECTION);
    const session = await collection.findOne<Session>({ token });
    return session;
  }

  addSession = async (_iduser: ObjectID | string) => {
    const session: Session = {
      _iduser: new ObjectID(_iduser),
      _dt: new Date(),
      token: generateHash(Math.random().toString())
    }

    const collection = await mongo.db.collection(COLLECTION);
    await collection.insertOne(session);
    return session.token;
  }

  rmSession = async (token: string) => {
    const collection = await mongo.db.collection(COLLECTION);
    await collection.remove({ token });
  }
}

export const sessionService = new SessionService();