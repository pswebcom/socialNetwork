import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu/Menu";
import Signup from "./user/Signup/Signup";
import Signin from "./user/Signin/Signin";
import Profile from "./user/Profile/Profile";
import EditProfile from "./user/EditProfile/EditProfile";
import PrivateRoute from "./core/auth/privateRoute";
import Spinner from "./UI/spinner/spinner";
import Users from "./user/Users";

const MainRouter = () => (
  <React.Fragment>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/user/edit/:userid" component={EditProfile} />
      <PrivateRoute exact path="/user/:userid" component={Profile} />
    </Switch>
  </React.Fragment>
);

export default MainRouter;
