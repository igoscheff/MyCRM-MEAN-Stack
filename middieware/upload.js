const multer = require('multer'), //Work with files
      moment = require('moment'); //Generating a date in a specific format

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        const date = moment().format('DDMMYYYY-HHmmss-SSS');
        callback(null, `${date}-${file.originalname}`)
    }
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5
};

module.exports = multer({ storage, fileFilter, limits });