import express from 'express';
import multer from "multer";
import os from "os";
import { checkAccess } from "../middlewares/checkAccess";
import { imageService } from "../services/image.service";

const upload = multer({ dest: os.tmpdir() });

export const router = express.Router()
  .put("/image", checkAccess, upload.single("image"), (req, res, next) => {
    imageService.saveImage(req.file)
  })