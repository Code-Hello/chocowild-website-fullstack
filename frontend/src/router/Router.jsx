import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../views/Home";
import Products from "../views/Products";
import Order from "../views/Order";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Admin from "../views/Admin";

import { WrapperAppli } from "../styles/containers";

const ProjectRouter = () => {
  return (
    <Router>
      <Header />
      <WrapperAppli>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </WrapperAppli>
    </Router>
  );
};

export default ProjectRouter;
