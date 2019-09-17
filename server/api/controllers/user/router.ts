import express from 'express';
import { userService } from "../../services/user.service";
import { sessionService } from '../../services/session.service';
import { res } from 'pino-std-serializers';

export const router = express.Router()
  .post("/getUsers", (req, res, next) => {
    const { query, options } = req.body;
    userService.getUsers(query, options).then(data => {
      res.json(data);
    }).catch(next);
  })
  .post("/login", (req, res, next) => {
    const { login, password } = req.body;    
    userService.login(login, password).then((token) => {
      res.json(token);
    }).catch(next);
  })
  .get("/logout", (req, res, next) => {
    sessionService.rmSession(req.headers.token as string)
    .then(() => {
      res.json({});
    })
    .catch(next)
  })
  .get("/isLoggedin", (req, res, next) => {
    userService.isLoggedin(req.headers.token as string).then(user => {
      res.json(user);
    }).catch(next);
  })