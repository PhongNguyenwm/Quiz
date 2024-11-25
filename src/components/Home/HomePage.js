import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">here's better way to ask</div>
        <div className="desc">
          You don't want to make a boring form. And you audience won't answer
          one. Create a typeform instead-and make every one happy.
        </div>
        {isAuthenticated === true ? (
          <div>
            <button className="homepage-btn" onClick={() => navigate("/users")}>
              Start Quiz Now
            </button>
          </div>
        ) : (
          <div className="homepage-btn" onClick={() => navigate("/login")}>
            <button>Get's started. It's free.</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
