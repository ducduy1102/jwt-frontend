import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //   console.log("View data", data);
    // });
  }, []);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (password.length < 6) {
      toast.error("Password is at least 6 characters");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ password is at least 1 lower case, 1 upper case, one digit, 8 character
    let regexPass = /^(?=.*\d)[0-9a-zA-Z]{6,}$/;
    if (!regexPass.test(password)) {
      toast.error("Password is at least one digit");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (confirmPassword !== password) {
      toast.error("Your password is not the same");
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    let check = isValidInputs();
    if (check === true) {
      axios.post("http://localhost:8080/api/v1/register", {
        email,
        phone,
        username,
        password,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="px-3 row px-sm-0">
          <div className="content-left col-sm-7 d-none d-sm-flex flex-column justify-content-center align-items-md-center">
            <div className="brand">Evil Shadow</div>
            <div className="detail">
              Evil Shadow helps you connect and share
            </div>
          </div>

          <div className="gap-3 px-lg-4 flex-column content-right col-sm-5 green d-flex justify-content-center">
            <div className="text-center brand d-sm-none">Evil Shadow</div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="re-password">Re-enter password</label>
              <input
                id="re-password"
                type="password"
                placeholder="Re-enter password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already have an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
