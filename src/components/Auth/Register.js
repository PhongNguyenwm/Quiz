import React, { useState } from "react";
import "./Login.scss";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    // validate
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    // submit api
    let res = await postRegister(email, password, username);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>You have an account?</span>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className="title col-4 mx-auto">Register</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <form className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="form-group password">
          <label>Password*</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {showPassword ? (
            <IoMdEyeOff
              className="eye"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoMdEye className="eye" onClick={() => setShowPassword(true)} />
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <button
            className="btn-login"
            onClick={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            Register
          </button>
        </div>
        <div className="back" onClick={() => navigate("/")}>
          <RiArrowGoBackFill />
          <span>Go to HomePage</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
