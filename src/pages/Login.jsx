import React, { Component } from "react";
import {NotificationContainer} from 'react-notifications';
import Idm from "../services/Idm";
import 'react-notifications/lib/notifications.css';
import "../css/common.css";
// import useInfo from "../hook/Session";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    // const {session, setSession, thEmail, setTheEmail } = useInfo();
  }
  

  handleSubmit = e => {
    e.preventDefault();

    const { handleLogIn } = this.props;
    const { email, password } = this.state;

    Idm.login(email, password)
      .then(response => {
        handleLogIn(email, response["data"]["session_id"], response["data"]["resultCode"], this.props.history);
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={this.updateField}
          >

          </input>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}
          ></input>
          <button className="button">Login</button>
        </form>
        <NotificationContainer/>
      </div>
    );
  }
}

export default Login;
