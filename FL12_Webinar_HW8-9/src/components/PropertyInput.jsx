import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PropertyInput extends Component {
  uppercasePropertyName = () => {
    const { propertyName: name } = this.props;
    return name[0].toUpperCase() + name.slice(1);
  };

  render() {
    const { title, propertyName, propertyValue } = this.props;
    return (
      <div>
        <div>{title || this.uppercasePropertyName()} *</div>
        <input
          value={propertyValue}
          onChange={event => {
            this.props.changeInputValue(propertyName, event.target.value);
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
  changeInputValue: PropTypes.instanceOf(Function).isRequired
};
