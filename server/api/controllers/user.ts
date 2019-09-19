import express from 'express';
import { userService } from "../services/user.service";
import { sessionService } from '../services/session.service';
import { checkAccess } from '../middlewares/checkAccess';

export const router = express.Router()
  .post("/items", checkAccess, (req, res, next) => {
    const { query } = req.body;
    userService.getUsers(query).then(data => {
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