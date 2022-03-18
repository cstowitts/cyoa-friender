import Home from "./Home";
import {Switch, Route, Redirect} from "react-router-dom";
import { useContext } from "react";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ProfileEditForm from "./forms/ProfileEditForm";
import UserContext from "./auth/UserContext";


function Routes ({register, login}){
    const { currentUser } = useContext(UserContext);

    return(
        <>
        {!currentUser 
         ?
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/register">
                    <RegisterForm register={register} />
                </Route>
                <Redirect to="/" />
            </Switch>
        :
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/profile">
                    <ProfileEditForm  />
                </Route>
                <Redirect to="/" />
            </Switch>
        }
    </>
    );
}

export default Routes;