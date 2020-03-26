import React, { Component } from "react";

export class Developer extends Component {
  toString() {
    JSON.stringify({
      id: this.id
    });
  }

  render() {
    return <div className="develper">{this.props.data.name}</div>;
  }
}
