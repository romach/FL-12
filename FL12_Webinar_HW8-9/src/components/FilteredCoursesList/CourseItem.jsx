import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { dateToString, templates } from "../../utils/DateUtils";
import styles from "./CourseItem.module.css";

export default class CourseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpened: false
    };
  }

  toggleMenu = () => {
    this.setState({ menuIsOpened: !this.state.menuIsOpened });
  };

  render() {
    const course = this.props.course;
    const { name, description, duration, date } = course;
    return (
      <div className={styles.item}>
        <div>{dateToString(new Date(date))(templates.COURSES_LIST)}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div>{duration}</div>
        <div>
          <button
            type="button"
            className={styles.menuButton}
            onClick={this.toggleMenu}
          >
            <span className={styles.menuButtonContent}>...</span>
          </button>
          {this.state.menuIsOpened ? (
            <div className={styles.menuWrapper}>
              <div className={styles.menu}>
                <div className={styles.menuCorner}></div>
                <Link className={styles.menuLink} to={`/edit/${course.id}`}>
                  <span className={styles.iconEdit}></span>Edit
                </Link>
                {/* eslint-disable-next-line */}
                <a
                  className={styles.menuLink}
                  href="#"
                  type="button"
                  onClick={event => {
                    event.preventDefault();
                    this.props.deleteCourse(this.props.course.id);
                  }}
                >
                  <span className={styles.iconDelete}></span>Delete
                </a>
              </div>
            </div>
          ) : null}
        </div>
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
