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

//TODO: add additional routes and details after they're written
// const {NotFoundError} = require("./ExpressError");
// const {authenitcateJWT} = require ("./middleware/auth")
// a bunch of routes

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


const {SECRET_ACCESS_KEY,
    ACCESS_KEY_ID,
    S3_BUCKET_NAME,
    REGION,
} = require('./config');



app.use(bodyParser.json());

AWS.config.update({
    secretAccessKey: SECRET_ACCESS_KEY,
    accessKeyId: ACCESS_KEY_ID,
    region: REGION
});


const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3_BUCKET_NAME,
        key: function (req, file, cb){
            console.log(file);
            cb(null, `${uuid()}-${file.originalname}`);
        }
       
    })
});

// const upload = multer({dest: 'uploads/'});


app.post('/', upload.single('profile-pic'), (req, res, next) => {
    return res.json({status: 'Image uploaded! Status: 200 OK'});
});



module.exports = app;