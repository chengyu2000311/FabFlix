import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import movieDetail from "./pages/movieDetail"
import Login from "./pages/Login";
import Movies from "./pages/Movie";
import Home from "./pages/Home";
import Register from "./pages/Register";
import shoppingCart from "./pages/shoppingCart"
import Complete from "./pages/complete"
import OrderHis from "./pages/OrderHis"

class Content extends Component {
  render() {
    const { handleLogIn } = this.props;

    return (
      <div className="content">
        <Switch>
          <Route path="/order" component={OrderHis}/>
          <Route path="/login" component={props => <Login handleLogIn={handleLogIn} {...props} />}/>
          <Route path="/complete" component={Complete}/>
          <Route path="/cart" component={shoppingCart}/>
          <Route path="/movieDetail" component={movieDetail} />
          <Route path="/register" component={Register} />
          <Route path="/movies" component={Movies} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Content;
