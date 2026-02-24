
import multer from "multer";
import path from "path";
// import fs from "fs";

// absolute path to src/uploads
const uploadPath = path.join(process.cwd(), "src", "uploads/");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {

    const cleanName = file.originalname.replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({ storage });

export default upload;

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const newFilename = Date.now() + '-' + file.originalname
//     cb(null, newFilename)
//   }
// })

// const upload = multer({ storage: storage })

// export default upload;