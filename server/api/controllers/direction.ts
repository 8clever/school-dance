import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { directionService } from "../services/direction.service";

export const router = express.Router()
  .post("/editDirection", checkAccess, (req, res, next) => {
    directionService.editDirection(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/getDirections", (req, res, next) => {
    const { query } = req.query;
    directionService.getDirections(query).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmDirection", (req, res, next) => {
    const { _id } = req.query;
    directionService.rmDirection(_id).then(() => {
      res.json({});
    }).catch(next);
  })