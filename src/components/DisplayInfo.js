import React, { Component } from "react";

class DisplayInfo extends Component {
  render() {
    const { listUsers } = this.props;

    //! props => viết tắt của từ properties
    return (
      <div>
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((item) => {
            return (
              <div key={item.id}>
                <div>My name is: {item.name}</div>
                <div>I'm: {item.age} year old</div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default DisplayInfo;
