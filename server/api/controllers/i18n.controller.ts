import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { i18nService } from '../services/i18n.service';

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    i18nService.edit(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort, skip, limit } = req.query;
    i18nService.find(query, sort, limit, skip).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    i18nService.remove({ _id }).then(() => {
      res.json({});
    }).catch(next);
  })