import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FilteredCoursesList from "./FilteredCoursesList";
import CourseInformation from "./CourseInformation";
import Container from "./Container";
import initialCourses from "../data.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: initialCourses
    };
  }

  updateCourse = updatedCourse => {
    const { courses } = this.state;
    courses.splice(
      courses.findIndex(course => course.id === updatedCourse.id),
      1,
      updatedCourse
    );
    this.setState({ courses });
  };

  addCourse = newCourse => {
    this.setState({ courses: [...this.state.courses, newCourse] });
  };

  deleteCourse = id => {
    const { courses } = this.state;
    courses.splice(
      courses.findIndex(course => course.id === id),
      1
    );
    this.setState({ courses });
  };

  cloneCourseById = id => {
    return { ...this.state.courses.find(course => course.id === id) };
  };

  createNewCourse = () => {
    return {
      id: this.getNewCourseId(),
      name: "",
      description: "",
      duration: "",
      authors: "",
      date: ""
    };
  };

  getNewCourseId = () => {
    const { courses } = this.state;
    const maximumId = courses.length
      ? Math.max(...courses.map(course => course.id))
      : 0;
    return maximumId + 1;
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Container>Learn</Container>
        </header>
        <main>
          <Container>
            <Router>
              <Switch>
                <Route path="/" exact>
                  <FilteredCoursesList
                    courses={this.state.courses}
                    deleteCourse={this.deleteCourse}
                  />
                </Route>
                <Route path="/create">
                  <CourseInformation
                    course={this.createNewCourse()}
                    saveAction={this.addCourse}
                  />
                </Route>
                <Route path="/edit/:id">
                  <CourseInformation
                    saveAction={this.updateCourse}
                    cloneCourseById={this.cloneCourseById}
                  />
                </Route>
              </Switch>
            </Router>
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
