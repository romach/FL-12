import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

export default class Input extends Component {
  render() {
    let input;
    if (this.props.type === "textarea") {
      input = (
        <textarea
          rows="5"
          className={styles.textarea}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
        />
      );
    } else {
      input = (
        <input
          className={styles.input}
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
