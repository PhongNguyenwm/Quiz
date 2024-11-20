import React, { Component } from "react";

class DisplayInfo extends Component {
  render() {
    const { name, age, myInfo } = this.props;
    console.log(myInfo);

    //! props => viết tắt của từ properties
    return (
      <div>
        <div>My name is {name}</div>
        <div>I'm {age}</div>
      </div>
    );
  }
}

export default DisplayInfo;
