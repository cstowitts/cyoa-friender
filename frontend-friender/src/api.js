import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params})).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }


      static async uploadProfilePic(file){
          const res = await this.request("", {filename: file}, "post");
          return res.data; 
      }



}

export default FrienderApi;