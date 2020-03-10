import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

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
        style={{
          display: "grid",
          gridTemplateColumns: "15% 20% auto 5% max-content",
          height: 80,
          backgroundColor: "white",
          borderRadius: 7,
          gridColumnGap: "2rem",
          padding: "0 2rem",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <div>{date}</div>
        <div
          style={{
            fontWeight: 600,
            maxHeight: "2.4em",
            lineHeight: "1.2em",
            overflow: "hidden"
          }}
        >
          {name}
        </div>
        <div
          style={{
            maxHeight: "2.4em",
            lineHeight: "1.2em",
            overflow: "hidden"
          }}
        >
          {description}
        </div>
        <div>{duration}</div>
        <div>
          <button type="button" onClick={this.toggleMenu}>
            Menu
          </button>
          {this.state.menuIsOpened ? (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  padding: "0.5rem",
                  right: 0,
                  border: "1px solid #ccc",
                  position: "absolute",
                  backgroundColor: "white"
                }}
              >
                <Link to={`/edit/${course.id}`}>
                  <button type="button">Edit</button>
                </Link>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.deleteCourse(this.props.course.id)
                    }
                  >
                    Delete
                  </button>
                </div>
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
