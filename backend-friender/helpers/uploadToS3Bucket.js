"use strict";

const {SECRET_ACCESS_KEY,
  ACCESS_KEY_ID,
  S3_BUCKET_NAME,
  REGION,
} = require('../config');
const { S3Client, PutObjectCommand  } = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");


/* S3 API
To send a request, you:
Initiate client with configuration (e.g. credentials, region).
Initiate command with input parameters.
Call send operation on client with command object as input.
If you are using a custom http handler, you may call destroy() to close open connections. */


const s3 = new S3Client({
  region: REGION,
  credentials:{
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY}
});

//TODO: DOCSTRING!
/** */
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




//Notes:
// Joel during AWS help session 1: 
// const FsPromises = require("fs/promises");
// async function attempt(){
//   const file = await FsPromises.open("./sample_img.png");
//   await uploadToS3Bucket(file);
// }

// attempt();