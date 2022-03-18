import Home from "./Home";
import {Switch, Route} from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";


function Routes ({register, login}){
    return(
        <Switch>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/login">
                <LoginForm login={login} />
            </Route>
            <Route path="/register">
                <RegisterForm register={register} />
            </Route>
        </Switch>
    );
}

export default Routes;