import React, {Component} from 'react';

export default class PubgButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <button className="pubg-button" onClick={this.props.toggle} style={this.props.toggleState
          ? {
            color: "black",
            backgroundColor: "#f8a427"
          }
          : {
            color: "#f8a427",
            backgroundColor: "black"
          }}>{this.props.text}</button>
    )
  }
}
