"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/User");

// const userNewSchema = require("../schemas/userNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const multer = require('multer');
const { uploadToS3Bucket } = require('../helpers/uploadToS3Bucket');

const router = express.Router();

//TODO: update the docstring and add schema validation


/** GET /[username] => { user }
 *
 * Returns: { 
   *    username, 
   *    firstName, 
   *    lastName, 
   *    email, 
   *    hobbies,
   *    interests,
   *    location,
   *    friend_radius,
   *    profile_pic_src 
   * }
 * 
 * Authorization required: same user-as-:username
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.getCurrentUser(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


//TODO: change docstring

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { 
   *    username, 
   *    firstName, 
   *    lastName, 
   *    email, 
   *    hobbies,
   *    interests,
   *    location,
   *    friend_radius,
   *    profile_pic_src 
   * }, token }
 *
 * Authorization required: admin
 **/
const upload = multer();

router.patch("/:username/profile", ensureCorrectUser, upload.single('fileFormData'),
  async function (req, res, next) {
    try {
      const fileURL = await uploadToS3Bucket(req.file);
      const {
        firstName,
        lastName,
        email,
        hobbies,
        interests,
        location,
        friendRadius
      } = { ...req.body.textFormData };

      const data = {
        firstName,
        lastName,
        email,
        hobbies,
        interests,
        location,
        friendRadius,
        profilePicSrc: fileURL
      }

      const user = await User.update(req.params.username, data);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });


module.exports = router;
