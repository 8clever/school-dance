import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { classService } from "../services/class.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    classService.edit(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort } = req.query;
    classService.get(query, sort).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    classService.rm({ _id }).then(() => {
      res.json({});
    }).catch(next);
  });