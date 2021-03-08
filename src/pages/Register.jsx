import React, { Component } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Idm from "../services/Idm";
import 'react-notifications/lib/notifications.css';
import "../css/common.css";


class Register extends Component {


  state = {
    email: "",
    password: ""
  };

  handleRegister = (response) => {
    if (response["data"]["resultCode"] === 110) {
      this.props.history.push("/login");
      NotificationManager.success(response["data"]["message"], 'Message', 1000);
    } else {
      NotificationManager.warning(response["data"]["message"], 'Warnning');
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    Idm.register(email, password)
      .then(response => {
        console.log(response);
        console.log(this.handleRegister);
        this.handleRegister(response);
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
        <h1>Register</h1>
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
          <button className="button">Register</button>
        </form>
        <NotificationContainer/>
      </div>
    );
  }
}


export default Register;