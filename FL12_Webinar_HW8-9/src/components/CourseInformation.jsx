import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import PropertyInput from "./PropertyInput";

class CourseInformation extends Component {
  constructor(props) {
    super(props);
    if (!props.course) {
      this.state = {
        course: props.cloneCourseById(parseInt(props.match.params.id))
      };
    } else {
      this.state = {
        course: this.props.course
      };
    }
  }

  changeProperty = (name, value) => {
    this.setState({
      course: { ...this.state.course, [name]: value }
    });
  };

  render() {
    const { name, description, duration, authors, date } = this.state.course;
    return (
      <div>
        <PropertyInput
          title="Title"
          propertyName="name"
          propertyValue={name}
          changeInputValue={this.changeProperty}
        />
        <PropertyInput
          propertyName="description"
          propertyValue={description}
          changeInputValue={this.changeProperty}
        />
        <PropertyInput
          propertyName="duration"
          propertyValue={duration}
          changeInputValue={this.changeProperty}
        />
        <PropertyInput
          propertyName="authors"
          propertyValue={authors}
          changeInputValue={this.changeProperty}
        />
        <PropertyInput
          propertyName="date"
          propertyValue={date}
          changeInputValue={this.changeProperty}
        />
        <Route
          render={({ history }) => (
            <button
              type="button"
              onClick={() => {
                this.props.saveAction(this.state.course);
                history.push("/");
              }}
            >
              Save
            </button>
          )}
        />
        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
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
  saveAction: PropTypes.instanceOf(Function).isRequired,
  cloneCourseById: PropTypes.instanceOf(Function)
};

export default withRouter(CourseInformation);
