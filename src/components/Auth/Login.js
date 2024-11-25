import React, { useState } from "react";
import "./Login.scss";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // validate
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);

    // submit api
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Login</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <form className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="form-group password">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
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
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-login"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Log in</span>
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

export default Login;
