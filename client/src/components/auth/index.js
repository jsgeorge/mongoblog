import React from "react";
import { Link } from "react-router-dom";
import Login2 from "./login2";

const LoginRegister = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h2>New User</h2>
            <Link to="/register" className="button">
              Register
            </Link>
          </div>
          <div className="right">
            <Login2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
