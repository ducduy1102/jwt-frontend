import React, { useEffect } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  useEffect(() => {
    axios.get("http://localhost:8080/api/test-api").then((data) => {
      console.log("View data", data);
    });
  }, []);
  return (
    <div className="login-container">
      <div className="container">
        <div className="px-3 row px-sm-0">
          <div className="content-left col-sm-7 d-none d-sm-flex flex-column justify-content-center align-items-md-center">
            <div className="brand">Evil Shadow</div>
            <div className="detail">
              Evil Shadow helps you connect and share
            </div>
          </div>

          <div className="gap-3 flex-column content-right col-sm-5 green d-flex justify-content-center">
            <div className="text-center brand d-sm-none">Evil Shadow</div>
            <input
              type="text"
              className="form-control"
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <button className="btn btn-primary">Login</button>
            <span className="text-center">
              <a className="forgot-password" href="#!">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
