import React from "react";
import Display from "./Display";
import Dashboard from "./Dashboard";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balls: 0,
      strikes: 0
    };
  }

  strike = ev => {
    ev.preventDefault()
    if (this.state.strikes >= 2) {
      this.setState({
        balls: 0,
        strikes: 0
      })
    } else {
      this.setState({
        strikes: this.state.strikes + 1
      })
    }
  };

  ball = ev => {
    ev.preventDefault()
    if (this.state.balls >= 3) {
      this.setState({
        balls: 0,
        strikes: 0
      })
    } else {
      this.setState({
        balls: this.state.balls + 1
      })
    }
  };

  foul = ev => {
    ev.preventDefault()
    if (this.state.strikes < 2) {
      this.setState({
        strikes: this.state.strikes + 1
      })
    }
  };

  hit = ev => {
    ev.preventDefault()
    this.setState({
      balls: 0,
      strikes: 0
    })
  };

  render() {
    return (
      <div className="App">
        <Display
          balls={this.state.balls}
          strikes={this.state.strikes}
        />
        <Dashboard
          strike={this.strike}
          ball={this.ball}
          foul={this.foul}
          hit={this.hit}
        />
      </div>
    );
  }
}

export default App;
