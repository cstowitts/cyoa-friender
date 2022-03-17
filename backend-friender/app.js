"use strict";

const express = require('express');

const AWS = require('aws-sdk'); 
const axios = require('axios');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jsonSchema = require('jsonschema');
const jsonWebToken = require('jsonwebtoken');
const morgan = require('morgan');
const multer = require('multer');
const multerS3 = require('multer-s3');
const pg = require('pg');
const uuid = require('uuid').v4;
const { uploadToS3Bucket } = require('./s3');

//TODO: add additional routes and details after they're written
// const {NotFoundError} = require("./ExpressError");
// const {authenitcateJWT} = require ("./middleware/auth")
// a bunch of routes

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


// const {SECRET_ACCESS_KEY,
//     ACCESS_KEY_ID,
//     S3_BUCKET_NAME,
//     REGION,
// } = require('./config');



// app.use(bodyParser.json());

// AWS.config.update({
//     secretAccessKey: SECRET_ACCESS_KEY,
//     accessKeyId: ACCESS_KEY_ID,
//     region: REGION
// });


    
    
const upload = multer();
//multer enables us to pass req.file into our async fn
    
   

app.post('/', upload.single('file'), async (req, res, next) => {
    const fileURL = await uploadToS3Bucket(req.file);
    return res.json({status: `Image uploaded at url ${fileURL} ! Status: 200 OK`});
});

//multipart form encoding for react to backend data sent
//look into taking the uploaded file and encoded properly before handing off to axios --formData api

module.exports = app;