import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
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
        <div className="homepage-btn">
          <button>Get's started. It's free.</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
