import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <div style={{ margin: "0 auto", maxWidth: "calc(1092px + 100px*2)", height: "100%"}}>
        <div style={{ padding: "0 100px", height: "100%"}}>{this.props.children}</div>
      </div>
    );
  }
}
