import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PropertyInput from "./PropertyInput";
import { create, update } from "../../actions";
import Button from "../Button";
import styles from "./CourseInformation.module.css";
import { templates, dateToString } from "../../utils/DateUtils";

const initializeNewCourse = () => {
  return {
    name: "",
    description: "",
    duration: "",
    authors: "",
    date: dateToString(new Date())(templates.MODEL)
  };
};

class CourseInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course:
        props.type === "new"
          ? initializeNewCourse()
          : {
              ...props.courses.find(
                course => course.id === parseInt(props.match.params.id)
              )
            },
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
    const propertyInputs = this.fetchEditableCourseProperties().map(
      property => (
        <PropertyInput
          key={property}
          title={
            property === "name" ? "Title" : this.uppercasePropertyName(property)
          }
          propertyName={property}
          propertyValue={this.state.course[property]}
          changeInputValue={this.changeProperty}
          isValidProperty={this.isValidProperty}
          afterFailedSave={this.state.afterFailedSave}
        />
      )
    );
    const smallInputs = propertyInputs.slice(2, 4);
    propertyInputs.splice(2, 2, <div key="small-inputs">{smallInputs}</div>);

    return (
      <div className={styles.courseInformation}>
        <div className={styles.container}>
          <h1 className={styles.title}>{this.props.title}</h1>
          <div className={styles.properties}>
            {propertyInputs}
            <Route
              render={({ history }) => (
                <div className={styles.marginWrapper}>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (this.informationIsValid()) {
                        this.props.type === "new"
                          ? this.props.create(this.state.course)
                          : this.props.update(this.state.course);
                        history.push("/");
                      } else {
                        this.setState({ afterFailedSave: true });
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              )}
            />
            <Link to="/">
              <div className={styles.marginWrapper}>
                <Button type="secondary">Cancel</Button>
              </div>
            </Link>
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
  type: PropTypes.string
};

const mapStateToProps = state => {
  const courses = state.courses;
  return { courses };
};

export default connect(mapStateToProps, { create, update })(
  withRouter(CourseInformation)
);
