const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `product/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter,
  limits: { fileSize: 1000000 }
});

module.exports = {
  upload
}
