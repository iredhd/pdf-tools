const qpdf = require('node-qpdf');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const zip = require('zip-folder');
const rimraf = require('rimraf');

module.exports = {
  encrypt: async ({ body, files }, response) => {
    const { password } = body;

    if (!files.length) {
      return response.status(400).json({
        error: 'FILES_NOT_FOUND',
        message: 'The API just accepts the .pdf extension',
      });
    }

    if (!password) {
      return response.status(400).json({
        error: 'PASSWORD_NOT_FOUND',
      });
    }

    const encryptedFiles = [];
    const dir = os.tmpdir();
    const destinationPath = path.join(dir, uuid(), 'sendfiles');

    fs.mkdirSync(destinationPath, { recursive: true });

    try {
      await Promise.all(files.map(async (item) => {
        const outputFile = path.join(destinationPath, item.originalname);

        const options = {
          keyLength: 128,
          password,
          outputFile,
        };

        await qpdf.encrypt(item.path, options);
        rimraf.sync(item.path);
        encryptedFiles.push(outputFile);
      }));
    } catch (e) {
      rimraf.sync(path.dirname(destinationPath));

      return response.status(500).json({
        error: 'ENCRYPT_ERROR',
      });
    }

    const zipFile = `${path.dirname(destinationPath)}.zip`;

    try {
      await new Promise((resolve, reject) => {
        zip(destinationPath, zipFile, (error) => {
          if (error) {
            reject(error);
          }

          resolve(zipFile);
        });
      });

      response.status(200).download(zipFile, path.basename(zipFile));

      return rimraf.sync(path.dirname(destinationPath));
    } catch (e) {
      return response.status(500).json({
        error: 'ZIP_ERROR',
      });
    }
  },
};
