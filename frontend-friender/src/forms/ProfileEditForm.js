
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
  const [profileUrl, setProfileUrl] = useState(null);
  console.log("profile image", profileUrl);


  async function handleSubmit(evt) {
    evt.preventDefault();
    const dataArray = new FormData();
    dataArray.append("textFormData", textFormData);
    dataArray.append("fileFormData", fileFormData);


    //don't need encType="multipart/form-data" bc we send it in the header of our axios request
    //don't need await the axios request bc we are using .then and .catch. If promise is resolved, runs .then cb. If promise is rejected, runs .catch cb.
    axios
      .post(`${BASE_URL}`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        setProfileUrl(response.data.imgUrl);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  //if we change the inl;ine change handler we can console love the input evt.target.files there
  //not in handleSubmit bc it's not the evt target we want

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">
          Choose your profile picture!
        </label>
        <input type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setFileFormData(e.target.files[0])}
        />

        <label htmlFor="username">
          username:
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
      {profileUrl &&
        <img src={profileUrl}  alt={`${textFormData.username} profile`}/>
      }
    </div>
  )

}


export default ProfileEditForm;