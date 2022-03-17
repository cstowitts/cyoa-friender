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
const { uploadToS3Bucket } = require('./helpers/uploadToS3Bucket');

//TODO: add additional routes and details after they're written
// const {NotFoundError} = require("./ExpressError");
// const {authenitcateJWT} = require ("./middleware/auth")
// a bunch of routes

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

    
    
const upload = multer();
//multer stores file data on req.file, enables us to pass req.file into our async fn

//req.body where other info lives
   
//'file' has to match the key of the appended file on the frontend in the FormData instance in our handleSubmit
app.post('/', upload.single('fileFormData'), async (req, res, next) => {
    const fileURL = await uploadToS3Bucket(req.file);
//save to db for user here!

    return res.json({
        status: "Status - 200 OK",  
        imgUrl: fileURL
    });
});

//multipart form encoding for react to backend data sent
//look into taking the uploaded file and encoded properly before handing off to axios --formData api

module.exports = app;