import express from 'express';
import multer from "multer";
import os from "os";
import { checkAccess } from "../middlewares/checkAccess";
import { imageService } from "../services/image.service";
import Jimp from "jimp";
import { Response } from "node-fetch";

const upload = multer({ dest: os.tmpdir() });

export const router = express.Router()
  .put("/upload", checkAccess, upload.single("image"), (req, res, next) => {
    imageService.saveImage(req.file).then((_id) => {
      res.json(_id);
    }).catch(next);
  })
  
  .get("/:id", (req, res, next) => {
    const { id } = req.params;
    const { w, h } = req.query as { w?: string; h?: string };

    if (!id) return next();

    (async () => {
      const image = await imageService.getImage(id);

      if (!image) return next();
      if (!(w && h)) return image.stream.pipe(res);

      const buffer = await new Response(image.stream).buffer()
      const jimpImg = await Jimp.read(buffer);
      const mImg = await jimpImg
        .cover(Number(w), Number(h));
      const mBuff = await mImg.getBufferAsync(jimpImg.getMIME());

      res.send(mBuff);
    })().catch(next);
  });