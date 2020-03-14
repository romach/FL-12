import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css"

export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={styles[this.props.type]}
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

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired
};
