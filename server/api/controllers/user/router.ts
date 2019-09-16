import express from 'express';
import { userService } from "../../services/user.service";

export const router = express.Router()
  .post("/getUsers", (req, res, next) => {
    const { query, options } = req.body;
    userService.getUsers(query, options).then(data => {
      res.json(data);
    }).catch(next);
  })
  .post("/login", (req, res, next) => {
    const { login, password } = req.body;    
    userService.login(login, password).then((data) => {
      res.json(data);
    }).catch(next)
  })
  .get("/isLoggeding", (req, res, next) => {
    const body = req.body;
    console.log(body);
  })