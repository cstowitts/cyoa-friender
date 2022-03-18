"use strict";

const bcrypt = require("bcrypt");
const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
    /** authenticate user with username, password.
     *
     * Returns { 
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
     *    
     * Throws UnauthorizedError is user not found or wrong password.
     **/

    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                      password,
                      first_name AS "firstName",
                      last_name AS "lastName",
                      email,
                      hobbies,
                      interests,
                      location,
                      friend_radius AS "friendRadius",
                      profile_pic_src AS "profilePicSrc"
               FROM users
               WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data.
   *
   * Returns { 
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
   * Throws BadRequestError on duplicates.
   **/
    static async register({ username, password, firstName, lastName, email }){
        const duplicateCheck = await db.query(
            `SELECT username
                FROM users
                WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
                (username,
                password,
                first_name,
                last_name,
                email)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email
            ],
        );

        const user = result.rows[0];

        return user;
    }

    //TODO: update docstring
    /** Given a username, return data about user.
   *
   * Returns { 
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
   * Throws NotFoundError if user not found.
   **/

  static async getCurrentUser(username) {
    const userRes = await db.query(
          `SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                hobbies,
                interests,
                location,
                friend_radius AS "friendRadius",
                profile_pic_src AS "profilePicSrc"
            FROM users
            WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

 /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { 
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
   * Returns:
   * { 
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
   * Throws NotFoundError if not found.
   *
   * NOTE: this function does not allow username or password changes.
   */

  static async update(username, data) {

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          email: "email",
          hobbies: "hobbies",
          interests: "interests",
          location: "location",
          friendRadius: "friend_radius",
          profilePicSrc: "profile_pic_src"
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                hobbies,
                                interests,
                                location,
                                friend_radius AS "friendRadius",
                                profile_pic_src AS "profilePicSrc"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }



}

module.exports = User;