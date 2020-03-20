const { Router } = require('express');
const os = require('os');

const upload = require('multer')({
  dest: os.tmpdir(),
  fileFilter: (_, file, cb) => cb(null, file.mimetype === 'application/pdf'),
});

const DevController = require('./controllers/PDFController');

const routes = Router();

routes.post('/encrypt', upload.array('files'), DevController.encrypt);

module.exports = routes;
