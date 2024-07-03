import React from "react";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="container">
        <div className="px-3 row px-sm-0">
          <div className="content-left col-sm-6 d-none d-sm-block">
            <div className="brand">Evil Shadow</div>
            <div className="detail">
              Evil Shadow helps you connect and share
            </div>
          </div>

          <div className="gap-3 py-3 flex-column content-right col-sm-6 green d-flex">
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
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success ">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
