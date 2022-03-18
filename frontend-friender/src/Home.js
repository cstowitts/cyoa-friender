// import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
/**
 * 
 */
function Home() {
    // const {user, token} = useContext(UserContext);

    return (
        <div className="Home">
            <h1>Welcome to make friends!</h1>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
        </div>
    );

}


export default Home;