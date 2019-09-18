import { mongo } from "../../common/db";
import { GridFSBucket, ObjectID } from "mongodb";
import { File } from "swagger-express-middleware";
import fs from "fs";
import { ServerError } from "../middlewares/error.handler";

const COLLECTION = "fs.files";

class ImageService {

  // 2mb
  uploadLimit = 2097152;

  getImage = async function (_id: ObjectID | string) {
    let images = await mongo.db.collection(COLLECTION);
    var query = { _id: new ObjectID(_id) }
    if (!query._id) return;
  
    let image = await images.findOne(query);
    if (!image) return;
  
    const bucket = new GridFSBucket(mongo.db);
    image.stream = bucket.openDownloadStream(image._id);
    return image;
  };

  saveImage = async (file: File): Promise<string> => {
    if (file.size > this.uploadLimit) {
      throw new ServerError("File size exceed limits: 2mb", 400);
    }

    const readStream = fs.createReadStream(file.path);
    const bucket = new GridFSBucket(mongo.db);
    const stream = bucket.openUploadStream(file.originalname);
    const objectId = stream.id;
  
    return new Promise((resolve, reject) => {
      stream.once('finish', function () {
        resolve(objectId.toString());
      });
      stream.once('error', reject);
      readStream.pipe(stream);
    });
  }
}

export const imageService = new ImageService();