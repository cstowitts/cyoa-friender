// "use strict";

// const express = require('express');


// const bodyParser = require('body-parser');
// const cors = require('cors');

// const morgan = require('morgan');
// const multer = require('multer');

// const uuid = require('uuid').v4;

// const {s3Instance} = require("./awsClient");
// const { S3Client, PutObjectCommand, AWS3 } = require("@aws-sdk/client-s3");


// //TODO: add additional routes and details after they're written
// // const {NotFoundError} = require("./ExpressError");
// // const {authenitcateJWT} = require ("./middleware/auth")
// // a bunch of routes

// const app = express();
 
// app.use(cors());
// app.use(express.json());
// app.use(morgan("tiny"));


// const {
//     S3_BUCKET_NAME,
//     REGION,
// } = require('./config');



// app.use(bodyParser.json());

    
// const upload = multer();
// //multer enables us to pass req.file into our async fn
    

// app.post('/', upload.single('profile-pic'), async (req, res, next) => {
 
//         const fileName = `${uuid()}-${req.file.originalname}`;

//         const uploadParams = {
//             Key: fileName,
//             Bucket: S3_BUCKET_NAME,
//             Body: req.file.buffer
//          };
//         const command = new AWS3.PutObjectCommand(uploadParams);

//     try {
//         const response = await s3Instance.send(command);
//         console.log("success, response: ", response);
//     } catch (err) {
//         console.log("Error: ", err);
//     }
    
//     return `https://${S3_BUCKET_NAME}.s3-${REGION}.amazonaws.com/${key}`;
//     }
// );

// //multipart form encoding for react to backend data sent
// //look into taking the uploaded file and encoded properly before handing off to axios --formData api

// module.exports = app;