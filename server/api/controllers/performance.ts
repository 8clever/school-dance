import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { eventService } from "../services/performance.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    eventService.editPerformance(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query } = req.query;
    eventService.getPerformance(query).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    eventService.rmPerformance({ _id }).then(() => {
      res.json({});
    }).catch(next);
  })