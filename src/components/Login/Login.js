import React from "react";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="mt-3 login-container">
      <div className="container">
        <div className="row">
          <div className="content-left col-6">
            <div className="brand">Evil Shadow</div>
            <div className="detail">
              Evil Shadow helps you connect and share
            </div>
          </div>

          <div className="gap-3 py-3 flex-column content-right col-6 green d-flex">
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
            <span className="text-center">Forgot your password?</span>
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
