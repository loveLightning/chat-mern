"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});
const types = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.uploadFile = multer({
    storage,
    fileFilter
});
