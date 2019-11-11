import express from 'express';
import { checkAccess } from '../middlewares/checkAccess';
import { teacherService } from "../services/teacher.service";

export const router = express.Router()
  .post("/editItem", checkAccess, (req, res, next) => {
    teacherService.editTeacher(req.body).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  .get("/items", (req, res, next) => {
    const { query, sort } = req.query;
    teacherService.getTeacher(query, sort).then(data => {
      res.json(data);
    }).catch(next);
  })
  .get("/rmItem", checkAccess, (req, res, next) => {
    const { _id } = req.query;
    teacherService.rmTeacher({ _id }).then(() => {
      res.json({});
    }).catch(next);
  });