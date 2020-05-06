import { MongoClient, Db as MongoDb } from "mongodb";

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

    const { userService } = require("../api/services/user.service")
    const { sessionService } = require("../api/services/session.service");
    const { serviceService } = require("../api/services/service.service");

    const [ users, session, services ] = await Promise.all([
      this.db.collection(userService.collection),
      this.db.collection(sessionService.collection),
      this.db.collection(serviceService.collection)
    ]);

    await Promise.all([
      // uniqu login for each user
      users.createIndex("login", { unique: true, min: 3 }),

      // unique ID for each service
      services.createIndex("id", { unique: true, min: 1 }),

      // expire session after 5 days
      session.createIndex("_dt", { expireAfterSeconds: 1000 * 60 * 60 * 24 * 5 })
    ]);
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