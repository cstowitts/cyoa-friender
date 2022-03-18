import axios from "axios";

const BASE_URL = "http://localhost:3001/";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, headers, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    FrienderApi.token = res.token;
    return res.token;
  }

  /** Signup for site. */

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    FrienderApi.token = res.token;
    return res.token;
  }

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


  /** Update and save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}/profile`, data, "patch");
    return res.user;
  }

  

}

export default FrienderApi;