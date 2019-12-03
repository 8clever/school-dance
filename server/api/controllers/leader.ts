import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { leaderService } from "../services/leader.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    leaderService.editLeader(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort, limit } = req.query;
    leaderService.getLeader(query, sort, limit).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    leaderService.rmLeader({ _id }).then(() => {
      res.json({});
    }).catch(next);
  });