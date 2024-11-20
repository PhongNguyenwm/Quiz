import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  // JSX
  render() {
    const myInfo = ["aa", "ab", "ac"];
    return (
      <div>
        <UserInfo />
        <DisplayInfo name="Mint" age="1" />
        <hr />
        <DisplayInfo name="Yên" age="35" myInfo={myInfo} />
      </div>
    );
  }
}

export default MyComponent;
