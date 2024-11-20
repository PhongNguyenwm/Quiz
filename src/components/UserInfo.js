import React, { Component } from "react";

class UserInfo extends Component {
  state = {
    name: "Phong",
    address: "HCM",
    age: 35,
  };

  handleOnchangeInput = (e) => {
    this.setState({ name: e.target.value });
  };
  handleOnchangeAge = (e) => {
    this.setState({ age: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm form {this.state.address}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label>Your's name</label>
          <input
            type="text"
            onChange={(e) => this.handleOnchangeInput(e)}
            value={this.state.name}
          />
          <button>Submit</button>

          <label>Your's age</label>
          <input
            type="text"
            onChange={(e) => this.handleOnchangeAge(e)}
            value={this.state.age}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
