import { ObjectID } from "mongodb";
import { mongo } from "../../common/db";
import { File } from "swagger-express-middleware";

class ImageService {

  saveImage = async (file: File) => {
    
  }

}

export const imageService = new ImageService();