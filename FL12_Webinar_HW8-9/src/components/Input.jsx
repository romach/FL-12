import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Input extends Component {
  render() {
    return (
      <input
        style={{
          height: 48,
          borderRadius: 7,
          border: "1px solid #d2d2d2",
          fontSize: "inherit",
          fontFamily: "inherit",
          fontWeight: "inherit",
          padding: "1rem"
        }}
        placeholder="Search"
        type="text"
        value={this.props.value}
        onChange={event => this.props.onChange(event.target.value)}
      />
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  placeholder: null
};
