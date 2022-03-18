import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./auth/UserContext";


/** Nav for navigation between resources
 * 
 * Props: 
 *  -logout: a function passed down from App component
 * 
 * Context: 
 * - user: {}
 * 
 * State: none
 * 
 * App -> Nav 
 */
//TODO: docstring for whenever you're using useContext
function NavBar({ logout }) {
  const { currentUser, token } = useContext(UserContext);
  console.log("user from nav", currentUser);
  console.log("token from nav", token);

  return (
    <>
      {!token
        ?
        <nav className="NavBar">
          <div className="NavBar-left">
            <NavLink exact to="/">Friender</NavLink>
          </div>
          <div className="NavBar-right">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        </nav>
        :
        <nav className="NavBar">
          <div className="NavBar-left">
            <NavLink exact to="/">Friender</NavLink>
          </div>
          <div className="NavBar-right">
            <NavLink to="/profile">Edit your profile</NavLink>
            <button onClick={logout}>Logout {currentUser.username}</button>
          </div>
        </nav>
      }


    </>
  );
}

export default NavBar;