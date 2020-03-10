import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        style={{
          height: 48,
          width: 224,
          borderRadius: 7,
          border: "none",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: 600,
          color: "white",
          background: "linear-gradient(#52e8db, #18acdb)",
          boxShadow: "0 0 7px 3px #a0e8e0",
          cursor: "pointer"
        }}
      >
        Add course
      </button>
    );
  }
}
