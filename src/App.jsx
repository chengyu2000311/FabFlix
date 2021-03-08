import React, { Component } from "react";
import Cookies from "js-cookie";
import Axios from "axios";
import {NotificationManager} from 'react-notifications';
import NavBar from "./NavBar";
import Content from "./Content";
import 'react-notifications/lib/notifications.css';

const localStorage = require("local-storage");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.checkedLoggedIn()
    };
  }

  handleLogIn = (email, session_id, resultCode, history) => {
    if (resultCode !== 120) {
      NotificationManager.warning("Password and email don't match", "Warnning", 500);
      return;
    }
    const { common } = Axios.defaults.headers;

    Cookies.set("email", email);
    Cookies.set("session_id", session_id);

    common["email"] = email;
    common["session_id"] = session_id;
    this.setState({ loggedIn: true });

    localStorage.set("email", email);
    localStorage.set("session_id", session_id);
    history.push("/movies");

    NotificationManager.success("Log in Sucessfully", "Message", 500);
  };

  handleLogOut = () => {
    const { common } = Axios.defaults.headers;

    Cookies.remove("email");
    Cookies.remove("session_id");

    delete common["email"];
    delete common["session_id"];

    this.setState({ loggedIn: false });
  };

  checkedLoggedIn() {
    return (
      Cookies.get("email") !== undefined &&
      Cookies.get("session_id") !== undefined
    );
  }

  render() {
    const { loggedIn } = this.state;
    
    return (
        <div className="app">
          <NavBar handleLogOut={this.handleLogOut} loggedIn={loggedIn} />
          <Content handleLogIn={this.handleLogIn} />
        </div>
    );
  }
}

export default App;
