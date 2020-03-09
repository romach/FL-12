import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export default class CourseItem extends Component {
  render() {
    const course = this.props.course;
    const { name, description, duration, authors, date } = course;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{name}</div>
        <div>{description}</div>
        <div>{duration}</div>
        <div>{authors}</div>
        <div>{date}</div>
        <Link to={`/edit/${course.id}`}>
          <button type="button">Edit</button>
        </Link>
        <button
          type="button"
          onClick={() => this.props.deleteCourse(this.props.course.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

CourseItem.propTypes = {
  course: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),
  deleteCourse: PropTypes.instanceOf(Function).isRequired
};
