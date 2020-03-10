import React, { Component } from "react";
import CoursesList from "./CoursesList";
import { Link } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";

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

  changeSearchString = searchString => this.setState({ search: searchString });

  render() {
    return (
      <div>
        <div
          style={{
            marginBottom: 24,
            display: "grid",
            gridTemplateColumns: "auto min-content",
            columnGap: "1.5rem"
          }}
        >
          <Input
            placeholder="Search"
            value={this.state.search}
            onChange={this.changeSearchString}
          />
          <Link to="/create">
            <Button>Add course</Button>
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
