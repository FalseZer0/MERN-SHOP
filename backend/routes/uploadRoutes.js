import path from "path";
import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //null is for the error
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  //true or false
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}
const upload = multer({
  storage,
  filefilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", protect, isAdmin, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
