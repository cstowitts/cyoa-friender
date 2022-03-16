/**
 * 
 */

function Home(submitAction){
    
    

    return (
        <form>
            <label htmlFor="profile-pic">
                Choose your profile picture!
            </label>
            <input type="file"
                    id="profile-pic" 
                    name="profile-pic"
                    accept="image/png, image/jpeg" />

            <button onSubmit={submitAction}>
                Upload Image
            </button>

        </form>
    )

}


export default Home;