import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Input extends Component {
  render() {
    let input;
    if (this.props.type === "textarea") {
      input = (
        <textarea
          rows="5"
          style={{
            borderRadius: 7,
            border: "1px solid #d2d2d2",
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit",
            padding: "1rem",
            display: "block",
            width: "100%"
          }}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
        />
      );
    } else {
      input = (
        <input
          style={{
            height: 48,
            borderRadius: 7,
            border: "1px solid #d2d2d2",
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit",
            padding: "1rem",
            display: "block",
            width: "100%"
          }}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
        />
      );
    }
    return input;
  }
}

Input.propTypes = {
  id: PropTypes.any,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

Input.defaultProps = {
  placeholder: null,
  type: "text"
};
