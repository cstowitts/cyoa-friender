const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid').v4;

const {SECRET_ACCESS_KEY,
    ACCESS_KEY_ID,
    S3_BUCKET_NAME,
    REGION,
} = require('../config');


const app = express();
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