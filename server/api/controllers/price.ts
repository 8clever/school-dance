import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { priceService } from "../services/price.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    priceService.edit(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query } = req.query;
    priceService.get(query).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    priceService.rm({ _id }).then(() => {
      res.json({});
    }).catch(next);
  });