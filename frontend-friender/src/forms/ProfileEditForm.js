
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../auth/UserContext";


const BASE_URL = "http://localhost:3001/";

function ProfileEditForm() {
  const { currentUser, token } = useContext(UserContext);

  const {
      username, 
      firstName, 
      lastName, 
      email, 
      hobbies, 
      location, 
      friendRadius
  } = {...currentUser}; 

  const DEFAULT_TEXT_FORM_DATA = {username, firstName, lastName, email, hobbies, location, friendRadius};
  const DEFAULT_FILE_DATA = currentUser.profilePicSrc;

  const [fileFormData, setFileFormData] = useState(DEFAULT_FILE_DATA);
  const [textFormData, setTextFormData] = useState(DEFAULT_TEXT_FORM_DATA);
  const [profileUrl, setProfileUrl] = useState(DEFAULT_FILE_DATA);
  console.log("profile image", profileUrl);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const dataArray = new FormData();
    dataArray.append("textFormData", textFormData);
    dataArray.append("fileFormData", fileFormData);

    //don't need encType="multipart/form-data" bc we send it in the header of our axios request
    //don't need await the axios request bc we are using .then and .catch. If promise is resolved, runs .then cb. If promise is rejected, runs .catch cb.
    axios
      .patch(`${BASE_URL}users/${currentUser.username}/profile`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        setProfileUrl(response.data.imgUrl);
        console.log("in axios then, profileUrl: ", profileUrl);
        console.log("then response: ", response);
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
          value={profileUrl}
          onChange={(e) => setFileFormData(e.target.files[0])}
        />

        <label htmlFor="username">
          username:
        </label>
        <input
          disabled 
          id="username"
          name="username"
          type="text"
          value={textFormData.username}
          onChange={(e) => setTextFormData(e.target.value)}
        />

        <label htmlFor="firstName">
          First Name:
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={textFormData.firstName}
          onChange={(e) => setTextFormData(e.target.value)}
        />

        <label htmlFor="lastName">
          Last Name:
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={textFormData.lastName}
          onChange={(e) => setTextFormData(e.target.value)}
        />

        <label htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={textFormData.email}
          onChange={(e) => setTextFormData(e.target.value)}
        />

        <label htmlFor="hobbies">
          Hobbies:
        </label>
        <input
          id="hobbies"
          name="hobbies"
          type="text"
          value={textFormData.hobbies}
          onChange={(e) => setTextFormData(e.target.value)}
        />   

        <label htmlFor="interests">
          Interests:
        </label>
        <input
          id="interests"
          name="interests"
          type="text"
          value={textFormData.interests}
          onChange={(e) => setTextFormData(e.target.value)}
        />    

        <label htmlFor="location">
          Current zipcode:
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={textFormData.location}
          onChange={(e) => setTextFormData(e.target.value)}
        />    
        
        <label htmlFor="friendRadius">
          Friend search radius (in miles):
        </label>
        <input
          id="friendRadius"
          name="friendRadius"
          type="number"
          value={textFormData.friendRadius}
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