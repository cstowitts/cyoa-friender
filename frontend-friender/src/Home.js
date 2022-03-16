/**
 * 
 */
import {useState} from "react";
import FrienderApi from "./api";


function Home(submitAction){
   const [file, setFile] = useState(null);

   async function handleSubmit(evt) {
       evt.preventDefault();
       await FrienderApi.uploadProfilePic(file);

   }
    

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="profile-pic">
                Choose your profile picture!
            </label>
            <input type="file"
                    id="profile-pic" 
                    name="profile-pic"
                    accept="image/png, image/jpeg" />

            <button>
                Upload Image
            </button>
        </form>
    )

}


export default Home;