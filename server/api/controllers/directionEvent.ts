import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { directionEventService } from "../services/directionEvent.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    directionEventService.editDirectionEvent(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query } = req.query;
    directionEventService.getDirectionEvents(query).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    directionEventService.rmDirectionEvent({ _id }).then(() => {
      res.json({});
    }).catch(next);
  })