import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import Calendar from "./Calendar";
import styles from "./PropertyInput.module.css";
import classes from "./PropertyInput.module.css";

export default class PropertyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasChanged: false
    };
  }

  highlightAsInvalid = () => {
    const { propertyValue: value } = this.props;
    return (
      !this.props.isValidProperty(value) &&
      (this.state.wasChanged || this.props.afterFailedSave)
    );
  };

  render() {
    const { title, propertyName, propertyValue } = this.props;
    const label = (
      <label
        htmlFor={propertyName}
        className={this.highlightAsInvalid() ? styles.invalidLabel : styles.label}
      >
        {title}*
      </label>
    );
    let input;
    if (propertyName === "description") {
      input = (
        <div className={styles[propertyName]}>
          {label}
          <Input
            id={propertyName}
            value={propertyValue}
            type="textarea"
            onChange={value => {
              this.props.changeInputValue(propertyName, value);
              this.setState({ wasChanged: true });
            }}
          />
        </div>
      );
    } else if (propertyName === "date") {
      input = (
        <div className={classes.date}>
          <Calendar
            value={propertyValue}
            onChange={value => {
              this.props.changeInputValue(propertyName, value);
              this.setState({ wasChanged: true });
            }}
          />
        </div>
      );
    } else {
      input = (
        <div className={styles[propertyName]}>
          {label}
          <Input
            id={propertyName}
            value={propertyValue}
            onChange={value => {
              this.props.changeInputValue(propertyName, value);
              this.setState({ wasChanged: true });
            }}
          />
        </div>
      );
    }
    return input;
  }
}

PropertyInput.propTypes = {
  title: PropTypes.string,
  propertyName: PropTypes.string.isRequired,
  propertyValue: PropTypes.string.isRequired,
  changeInputValue: PropTypes.instanceOf(Function).isRequired,
  isValidProperty: PropTypes.instanceOf(Function).isRequired,
  afterFailedSave: PropTypes.bool.isRequired
};
