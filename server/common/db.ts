import { MongoClient, Db as MongoDb } from "mongodb";
import { COLLECTION as userCollection } from "../api/services/user.service"
import { COLLECTION as sessionCollection } from "../api/services/session.service";

class Db {
  url: string;
  name: string;
  db?: MongoDb;

  constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
  }

  insertIndexes = async () => {
    if (!this.db) return;

    const users = await this.db.collection(userCollection);
    const session = await this.db.collection(sessionCollection);

    // uniqu login for each user
    await users.createIndex("login", { unique: true, min: 3 });
    
    // expire session after 5 days
    await session.createIndex("_dt", { expireAfterSeconds: 1000 * 60 * 60 * 24 * 5 });
  }

  connect = async () => {
    const client = await MongoClient.connect(this.url, { 
      useUnifiedTopology: true,
      useNewUrlParser: true 
    });
    this.db = client.db(this.name);
    await this.insertIndexes()
  }
}

export const mongo = new Db(process.env.MONGO_URL, process.env.MONGO_DBNAME);