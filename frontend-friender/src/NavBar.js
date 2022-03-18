import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./userContext";

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
  const {user, token} = useContext(UserContext);
  console.log("user from nav", user);

  return (
    <>
        <nav className="NavBar">
          <div className="NavBar-left">
            <NavLink exact to="/">Friender</NavLink>
          </div>
          <div className="NavBar-right">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        </nav>
        
    </>
  );
}

export default NavBar;