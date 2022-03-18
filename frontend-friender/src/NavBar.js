// import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import UserContext from "./userContext";

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
  // const {user, token} = useContext(UserContext);
  // console.log("user from nav", user);

  return (
    <>
        <nav className="NavBar">
          <div className="Nav-left">
            <NavLink exact to="/">Friender</NavLink>
          </div>
          <div className="Nav-right">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        </nav>
        
    </>
  );
}

export default NavBar;