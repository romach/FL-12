import React, { Component } from "react";
import CourseItem from "./CourseItem";

export default class CoursesList extends Component {
  render() {
    return (
      <div style={{display: "grid", gridRowGap: 6, fontSize: 14}}>
        {this.props.courses.map(course => (
          <CourseItem
            key={course.id}
            course={course}
            deleteCourse={this.props.deleteCourse}
          />
        ))}
      </div>
    );
  }
}
