import React, { useState } from "react";
import "./Login.scss";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // validate
    // submit api
    let res = await postLogin(email, password);
    console.log(res);
    if (res && +res.data.EC === 0) {
      toast.success(res.data.EM);
      navigate("/");
    }
    if (res && +res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Login</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-login" onClick={() => handleLogin()}>
            Log in
          </button>
        </div>
        <div className="back" onClick={() => navigate("/")}>
          <RiArrowGoBackFill />
          <span>Go to HomePage</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
