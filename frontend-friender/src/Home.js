import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UserContext from "./auth/UserContext";
/**
 * 
 */

function Home() {
    const { user, token } = useContext(UserContext);

    return (
        <>
            {!token
                ?
                <div className="Home">
                    <h1>Welcome to make friends!</h1>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Register</Link>
                </div>
                :
                <div className="Home">
                    <h1>Welcome {user.username} to make friends!</h1>  
                </div>
            }
        </>
    );

}


export default Home;