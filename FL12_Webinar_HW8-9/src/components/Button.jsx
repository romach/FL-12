import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={`button ${this.props.type}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  onClick: null
};

Button.propTypes = { type: PropTypes.string.isRequired };
