// "use strict";

// const express = require('express');

// const AWS = require('aws-sdk'); 
// const axios = require('axios');
// // const bcrypt = require('bcrypt');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const jsonSchema = require('jsonschema');
// // const jsonWebToken = require('jsonwebtoken');
// // const morgan = require('morgan');
// const multer = require('multer');

// // const multerS3 = require('multer-s3');

// // const pg = require('pg');
// const uuid = require('uuid').v4;


const {SECRET_ACCESS_KEY,
  ACCESS_KEY_ID,
  S3_BUCKET_NAME,
  REGION,
} = require('./config');

// AWS.config.update({
//   secretAccessKey: SECRET_ACCESS_KEY,
//   accessKeyId: ACCESS_KEY_ID,
//   region: REGION
// });


// const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// const upload = multer({
//   storage: multerS3({
//       s3: s3,
//       bucket: S3_BUCKET_NAME,
//       key: function (req, file, cb){
//           console.log(file);
//           cb(null, `${uuid()}-${file.originalname}`);
//       }
     
//   })
// });

const { S3Client, PutObjectCommand  } = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");
const FsPromises = require("fs/promises");


/* S3 API
To send a request, you:
Initiate client with configuration (e.g. credentials, region).
Initiate command with input parameters.
Call send operation on client with command object as input.
If you are using a custom http handler, you may call destroy() to close open connections. */


// const REGION = "us-west-1"; //e.g. "us-east-1"
// Create S3 service object
// const s3 = new S3Client({region: REGION});
const s3 = new S3Client({
  region: REGION,
  credentials:{
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY}
});



async function uploadToS3Bucket(file) {
  console.log("uploadToS3Bucket file: ", file);
  console.log("file.buffer: ", file.buffer);

  const key = uuid();
  const putObjectCommand = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: "image/jpeg",
    Tagging: "public=yes"
  })
  try {
    const data = await s3.send(putObjectCommand);
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
  return `https://${S3_BUCKET_NAME}.s3-${REGION}.amazonaws.com/${key}`
};

module.exports = { uploadToS3Bucket };

// async function attempt(){
//   const file = await FsPromises.open("./sample_img.png");
//   await uploadToS3Bucket(file);
// }

// attempt();