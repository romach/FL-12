import React, { Component } from "react";
import CourseItem from "./CourseItem";
import styles from "./CoursesList.module.css";

export default class CoursesList extends Component {
  render() {
    return (
      <div className={styles.list}>
        {this.props.courses.map(course => (
          <CourseItem
            key={course.id}
            course={course}
          />
        ))}
      </div>
    );
  }
}
