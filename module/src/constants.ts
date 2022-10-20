import { diskStorage } from "multer";

export const CONSTANTS = {
  VTraceApi: "https://vtracy.herokuapp.com/api",
};

export const storage = diskStorage({
  destination: __dirname+"/../../../../uploads",
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  }
});

function generateFilename(file) {
  return `${file.originalname}`;
}
