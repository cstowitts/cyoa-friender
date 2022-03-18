import Home from "./Home";
import {Switch, Route} from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";


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
        </Switch>
    );
}

export default Routes;