"use strict";

const app = require("./app");
const express = require ("express");


app.listen(3001, function () {
    console.log("App started at http://localhost:3001/");
})