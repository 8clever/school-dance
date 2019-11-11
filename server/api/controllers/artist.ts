import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { artistService } from "../services/artist.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    artistService.editArtist(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort } = req.query;
    artistService.getArtist(query, sort).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    artistService.rmArtist({ _id }).then(() => {
      res.json({});
    }).catch(next);
  })