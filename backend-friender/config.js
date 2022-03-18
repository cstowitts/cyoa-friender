"use strict";

/** Shared config for application; can be required many places. */

const dotenv = require('dotenv');
dotenv.config();
require("colors");


const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const REGION = process.env.REGION;
const DB_URI = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const BCRYPT_WORK_FACTOR = 15;

console.log("Friender Config:".green);
console.log("SECRET_ACCESS_KEY:".yellow, SECRET_ACCESS_KEY);
console.log("ACCESS_KEY_ID:".yellow, ACCESS_KEY_ID);
console.log("S3_BUCKET_NAME:".yellow, S3_BUCKET_NAME);
console.log("REGION:".yellow, REGION);
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, DB_URI);
console.log("---");


//TODO: MAKE SURE TO REMOVE THESE BEFORE DEPLOY/PUBLIC


module.exports = {
    SECRET_ACCESS_KEY,
    ACCESS_KEY_ID,
    S3_BUCKET_NAME,
    REGION,
    BCRYPT_WORK_FACTOR,
    DB_URI,
    SECRET_KEY
}