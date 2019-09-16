import './common/env';
import Server from './common/server';
import { mongo } from "./common/db";

const port = parseInt(process.env.PORT);

(async () => {
  await mongo.connect();
  const server = new Server();
  server.init().listen(port);
})().catch(console.error);

