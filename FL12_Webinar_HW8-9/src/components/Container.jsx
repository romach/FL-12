import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {this.props.children}
      </div>
    );
  }
}
