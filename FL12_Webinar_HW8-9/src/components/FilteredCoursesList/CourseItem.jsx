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
      <div
      className={styles.item}
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "10% 20% auto 10% max-content",
        //   height: 80,
        //   backgroundColor: "white",
        //   borderRadius: 7,
        //   gridColumnGap: "2rem",
        //   padding: "0 2rem",
        //   alignContent: "center",
        //   alignItems: "center"
        // }}
      >
        <div>{dateToString(new Date(date))(templates.COURSES_LIST)}</div>
        <div className={styles.name}
          // style={{
          //   fontWeight: 600,
          //   maxHeight: "2.4em",
          //   lineHeight: "1.2em",
          //   overflow: "hidden"
          // }}
        >
          {name}
        </div>
        <div className={styles.description}
          // style={{
          //   maxHeight: "2.4em",
          //   lineHeight: "1.2em",
          //   overflow: "hidden"
          // }}
        >
          {description}
        </div>
        <div>{duration}</div>
        <div>
          <button
            type="button"
            className={styles.menuButton}
            // style={{
            //   background: "none",
            //   border: "none",
            //   cursor: "pointer",
            //   fontSize: 24,
            //   color: "#afafaf",
            //   letterSpacing: "0.25rem"
            // }}
            onClick={this.toggleMenu}
          >
            <span
              // style={{ verticalAlign: "super" }}
              className={styles.menuButtonContent}
            >...</span>
          </button>
          {this.state.menuIsOpened ? (
            <div 
              className={styles.menuWrapper}
              // style={{ position: "relative" }}
            >
              <div
                className={styles.menu}
                // style={{
                //   width: 182,
                //   padding: "1rem",
                //   right: 0,
                //   borderRadius: 4,
                //   boxShadow: "0 0 7px #ccc",
                //   position: "absolute",
                //   backgroundColor: "white"
                // }}
              >
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
