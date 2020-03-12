import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import PropertyInput from "./PropertyInput";
import Button from "../Button";

class CourseInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
        ? props.course
        : props.cloneCourseById(parseInt(props.match.params.id)),
      afterFailedSave: false
    };
  }

  changeProperty = (name, value) => {
    this.setState({
      course: { ...this.state.course, [name]: value }
    });
  };

  isValidProperty = value => value.toString().trim().length > 0;

  fetchEditableCourseProperties = () =>
    Object.keys(this.state.course).filter(key => key !== "id");

  informationIsValid = () =>
    this.fetchEditableCourseProperties().every(property =>
      this.isValidProperty(this.state.course[property])
    );

  uppercasePropertyName = name => {
    return name[0].toUpperCase() + name.slice(1);
  };

  render() {
    return (
      <div className="course-information">
        <div className="container">
          <h1 style={{ lineHeight: "140px", textAlign: "center" }}>
            {this.props.title}
          </h1>
          <div className="properties">
            {this.fetchEditableCourseProperties().map(property => (
              <PropertyInput
                key={property}
                title={
                  property === "name"
                    ? "Title"
                    : this.uppercasePropertyName(property)
                }
                propertyName={property}
                propertyValue={this.state.course[property]}
                changeInputValue={this.changeProperty}
                isValidProperty={this.isValidProperty}
                afterFailedSave={this.state.afterFailedSave}
              />
            ))}
            <Route
              render={({ history }) => (
                <Button
                  type="primary"
                  onClick={() => {
                    if (this.informationIsValid()) {
                      this.props.saveAction(this.state.course);
                      history.push("/");
                    } else {
                      this.setState({ afterFailedSave: true });
                    }
                  }}
                >
                  Save
                </Button>
              )}
            />
            <Link to="/">
              <Button type="secondary">Cancel</Button>
            </Link>
          </div>
          <div className="buttons">
            {/* <Route
              render={({ history }) => (
                <Button type ="primary"
                onClick={() => {
                  if (this.informationIsValid()) {
                    this.props.saveAction(this.state.course);
                    history.push("/");
                  } else {
                    this.setState({ afterFailedSave: true });
                  }
                }}
              >
                Save
              </Button>
              )}
            />
            <Link to="/">
              <Button type ="secondary">Cancel</Button>
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

CourseInformation.propTypes = {
  course: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  saveAction: PropTypes.instanceOf(Function).isRequired,
  cloneCourseById: PropTypes.instanceOf(Function)
};

export default withRouter(CourseInformation);
