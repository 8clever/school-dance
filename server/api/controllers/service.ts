import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { serviceService } from "../services/service.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    serviceService.edit(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort, limit } = req.query;
    serviceService.find(query, sort, limit).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    serviceService.remove({ _id }).then(() => {
      res.json({});
    }).catch(next);
  });