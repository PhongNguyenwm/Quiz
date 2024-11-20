import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "Phong",
    address: "HCM",
    age: 35,
  };

  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm form {this.state.address}
      </div>
    );
  }
}

export default MyComponent;
