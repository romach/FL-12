import React, { Component } from "react";
import PropTypes from "prop-types";

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
    return (
      <div>
        <div style={this.highlightAsInvalid() ? { color: "red" } : null}>
          {title} *
        </div>
        <input
          value={propertyValue}
          onChange={event => {
            this.props.changeInputValue(propertyName, event.target.value);
            this.setState({ wasChanged: true });
          }}
        />
      </div>
    );
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
