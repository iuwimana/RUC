import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import Joi from "joi-browser";
import * as auth from "../../services/authService";
import Form from "../common/form";
import App from "../../App";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./welcome.css";
import myLogo from "./Rwanda_Coat0fArm.png";


class Index extends Form {
   state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
  }

   doSubmit = async (e) => {
    try {
      const { data } = this.state;
      if (data.username === "" && data.password === "") {
        toast.info(
          `Those Field are Required, Please fill it!! ${data.username} and ${data.password}`
        );
      } else if (data.username === "") {
        toast.info("Email is Required, Please fill it!!");
      } else if (data.password === "") {
        toast.info("password is Required, Please fill it!!");
      } else {
        await auth.login(data.username, data.password);
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/welcome";
        toast.success(`Dear  ${data.username} you are login successful`);
       
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        toast.error("Error:" + errors.username);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        toast.error("Error:" + errors.username);
        this.setState({ errors });
      } 
    }
  };

  render() {
    //if (auth.getCurrentUser()) return <Redirect to="/" />; 
    return (
             
          <div className="App">
      <div className="byose">
          <div className="emblem">
            <img src={myLogo} className="myLogo" alt="logo" />
            <h1>Welcome to Road User Charging System <br/> <big><b>RUCS</b></big></h1>
          </div>
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <h2>Signin to Your Account</h2>
              <div className="input-box">
               
               
                  {this.renderInput("username", "Username")}
              </div>
              <div className="input-box">
                
                {this.renderInput("password", "Password", "password")}
              </div>
              <br/>
              <button type="submit" className="btns" >Login</button>
              <div className="register">
                {/*<p>Don't have an Account? <a href="#">Register</a></p>*/}
              </div>
    
            </form>

          </div>
            
      </div>
    </div>
    );
  }
}

export default Index;
