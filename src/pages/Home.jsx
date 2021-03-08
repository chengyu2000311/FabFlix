import React, { Component } from "react";
import logo from '../static/Logo.png'
import Register from "./Register";
import Button from '@material-ui/core/Button';

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Welcome To FabFlix &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src={logo} alt="Logo"/></h1>
        {/* <h1>Enjoy Thousands of Movies Tonight</h1> */}
        <br></br>
        <Register history={this.props.history}></Register> 
        <br></br> <br></br>
        <Button variant="contained" color="default" size="medium" onClick={() => this.props.history.push("/login")}>
        Already a User? Log in
        </Button>

      </div>
    );
  }
}

export default Home;
