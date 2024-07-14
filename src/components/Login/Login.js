import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Login = (props) => {
  const { loginContext } = useContext(UserContext);

  let history = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaulObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaulObjValidInput);

  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaulObjValidInput);

    if (!valueLogin) {
      setObjValidInput({ ...defaulObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your email address or phone number");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaulObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }
    let response = await loginUser(valueLogin, password);
    // console.log(response.data);
    if (response && +response.errorCode === 0) {
      // success
      let groupWithRoles = response.data.groupWithRoles;
      let email = response.data.email;
      let username = response.data.username;
      let token = response.data.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: {
          email,
          username,
          groupWithRoles,
        },
      };
      loginContext(data);
      history.push("/users");

      // redux
    }
    if (response && +response.errorCode !== 0) {
      // error
      toast.error(response.message);
    }
  };

  const handlePressEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      // alert("Click me!");
      handleLogin();
    }
  };

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
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "is-invalid form-control"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
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
