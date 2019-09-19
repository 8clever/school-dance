import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { eventService } from "../services/event.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    eventService.editEvent(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query } = req.query;
    eventService.getEvents(query).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    eventService.rmEvent(req.query).then(() => {
      res.json({});
    }).catch(next);
  });