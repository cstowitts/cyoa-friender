import Home from "./Home";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ProfileEditForm from "./forms/ProfileEditForm";


function Routes ({register, login}){
    return(
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
            <Route exact path="/profile">
                <ProfileEditForm  />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;