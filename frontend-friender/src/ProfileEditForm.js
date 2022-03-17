
import { useState } from "react";
import axios from "axios";

const DEFAULT_FORM_DATA = {
  username: "",
  // firstName: "",
  // lastName: "",
  // email: "",
  // hobbies: "",
  // location: "",
  // friendRadius: "",  // when using radius, need to convert from string to number
};

const DEFAULT_FILE_DATA = { file: null };

const BASE_URL = "http://localhost:3001/";

function ProfileEditForm() {
  const [fileFormData, setFileFormData] = useState(DEFAULT_FILE_DATA);
  const [textFormData, setTextFormData] = useState(DEFAULT_FORM_DATA);
  

  async function handleSubmit(evt) {
    evt.preventDefault();
    const dataArray = new FormData();
    dataArray.append("textFormData", textFormData);
    dataArray.append("fileFormData", fileFormData);

    console.log("data from profile form:", dataArray.get);

    await axios
      .post(`${BASE_URL}`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("Successfully uploaded form!");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">
        Choose your profile picture!
      </label>
      <input type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        onChange={(e) => setFileFormData(e.target.files)}
      />

      <label htmlFor="username">
        userName:
      </label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={(e) => setTextFormData(e.target.value)}
      />

      <button>
        Submit
      </button>
    </form>
  )

}


export default ProfileEditForm;