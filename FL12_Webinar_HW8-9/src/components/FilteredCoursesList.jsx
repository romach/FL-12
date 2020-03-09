import React, { Component } from "react";
import CoursesList from "./CoursesList";
import { Link } from "react-router-dom";

export default class FilteredCoursesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  filterCourses = () =>
    this.props.courses.filter(course =>
      course.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.search}
            onChange={event => this.setState({ search: event.target.value })}
          />
          <Link to="/create">
            <button type="button">Add course</button>
          </Link>
        </div>
        <CoursesList
          courses={this.filterCourses()}
          deleteCourse={this.props.deleteCourse}
        />
      </div>
    );
  }
}
