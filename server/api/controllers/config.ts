import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { configService } from "../services/config.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    configService.editConfig(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/main", (req, res, next) => {
    configService.getConfig().then((config) => {
      res.json(config);
    }).catch(next);
  })