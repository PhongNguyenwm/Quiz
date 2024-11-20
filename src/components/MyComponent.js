import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "Phong",
    address: "HCM",
    age: 35,
  };

  handleClick = (e) => {
    console.log("Click my button");
    this.setState({ name: "Yên" });
    this.setState({ age: Math.floor(Math.random() * 100 + 1) });
  };

  handleOnMouseOver = (e) => {
    console.log(e.pageX);
  };

  handleOnchangeInput = (e) => {
    this.setState({ name: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
  };

  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm form {this.state.address}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button
          onClick={(e) => {
            this.handleClick(e);
          }}
        >
          Click me
        </button>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input type="text" onChange={(e) => this.handleOnchangeInput(e)} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
