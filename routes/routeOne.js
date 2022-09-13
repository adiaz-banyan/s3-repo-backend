const express = require('express');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const route = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFunc, getFileStream } = require('../s3');

route.post('/s3-url-images', upload.single('image'), async (req, res) => {
  const file = req.file;
  const description = req.body.description;
  const result = await uploadFunc(file);
  await unlinkFile(file.path);
  res.send({ imagePath: `/images/${result.Key}` });
});

route.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

module.exports = route;
