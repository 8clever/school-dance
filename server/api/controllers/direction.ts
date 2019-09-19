import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { directionService } from "../services/direction.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    directionService.editDirection(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query } = req.query;
    directionService.getDirections(query).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    directionService.rmDirection(req.query).then(() => {
      res.json({});
    }).catch(next);
  })