import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import Routes from "./Routes";
import ProfileEditForm from "./forms/ProfileEditForm";
import LoadingSpinner from "./common/LoadingSpinner";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

//TODO: update docstring


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Friender application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *  - goRedirect: boolean to indicate whether or not we should redirect.
 *   Redirect to /companies after successful login or signup
 *
 * App -> Routes
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [goRedirect, setGoRedirect] = useState(false);
  console.debug("App",
    "currentUser = ", currentUser,
    "infoLoaded = ", infoLoaded,
    "token = ", token,
    "goRedirect = ", goRedirect);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);

          setCurrentUser(currentUser);
          setGoRedirect(false);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup and sets goRedirect
   * state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function register(signupData) {
    let token = await JoblyApi.register(signupData);
    setToken(token);
    setGoRedirect(true);
  }

  /** Handles site-wide login.
   *
   * Logs in a user and sets goRedirect state to true.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function login(loginData) {
    let token = await JoblyApi.login(loginData);
    setToken(token);
    setGoRedirect(true);
  }

  // after login/signup success, redirect to /companies
  if (goRedirect) return <Redirect push to="/" />;

  if (!infoLoaded) return <LoadingSpinner />;



  return (
    <UserContext.Provider
    value={{
      currentUser,
      setCurrentUser,
    }}>
      <NavBar />
      <Routes />
    </UserContext.Provider>

  );
}

export default App;
