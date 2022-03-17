const AWS3 = require("@aws-sdk/client-s3");

const {SECRET_ACCESS_KEY,
    ACCESS_KEY_ID,
    S3_BUCKET_NAME,
    REGION,
  } = require('./config');

const s3Instance = new AWS3.S3Client({credentials: {ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION}});

module.exports = {s3Instance};