import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { pieceOfNewsService } from '../services/pieceofnews.service';

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    pieceOfNewsService.editPieceOfNews(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort, skip, limit } = req.query;
    pieceOfNewsService.getNews(query, sort, limit, skip).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    pieceOfNewsService.rmPieceOfNews({ _id }).then(() => {
      res.json({});
    }).catch(next);
  })