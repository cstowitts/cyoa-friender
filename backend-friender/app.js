"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// const jsonSchema = require('jsonschema');
// const jsonWebToken = require('jsonwebtoken');
const morgan = require('morgan');

//TODO: add additional routes and details after they're written
const {NotFoundError} = require("./ExpressError");
const {authenticateJWT} = require ("./middleware/auth")
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    throw new NotFoundError();
  });
  
/** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;