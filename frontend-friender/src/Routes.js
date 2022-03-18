import Home from "./Home";
import {Switch, Route} from "react-router-dom";
import FrienderApi from "./api";


function Routes (){


    return(
        <Switch>
            <Route path="/">
                <Home submitAction={FrienderApi.uploadProfilePic}/>
            </Route>
        </Switch>
    )
}

export default Routes;