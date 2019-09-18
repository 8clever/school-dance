import express from 'express';
import multer from "multer";
import os from "os";
import { checkAccess } from "../middlewares/checkAccess";
import { imageService } from "../services/image.service";

const upload = multer({ dest: os.tmpdir() });

export const router = express.Router()
  .put("/upload", checkAccess, upload.single("image"), (req, res, next) => {
    imageService.saveImage(req.file).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  
  .get("/:id", (req, res, next) => {
    const { id } = req.params;
    if (!id) return next();

    imageService.getImage(id).then(image => {
      if (!image) return next();

      image.stream.pipe(res);
    }).catch(next);
  });