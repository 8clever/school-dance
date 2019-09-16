import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import { openapi } from './openapi';
import l from './logger';

const app = express();

export default class ExpressServer {
  
  root = path.normalize(__dirname + '/../..');

  init(): ExpressServer {
    // middlewares    
    app.set('appPath', this.root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));

    if (process.env.DEVELOPMENT) {
      const { devMiddleware, hotMiddleware } = require("./dev");
      app.use(devMiddleware);
      app.use(hotMiddleware);
    }
    
    app.use(express.static(`${this.root}/public`));

    // api
    openapi(app);
    
    // react
    app.use('*', (req, res) => {
      res.sendFile(`${this.root}/public/web/index.html`);
    });

    return this;
  }

  listen(p: number = parseFloat(process.env.PORT)): Application {
    const welcome = 
      (port: number) => 
      () =>
      l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`);
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
