import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FilteredCoursesList from "./components/FilteredCoursesList/FilteredCoursesList";
import CourseInformation from "./components/CourseInformation/CourseInformation";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import initialCourses from "./data.json";
import { templates, dateToString } from "./utils/DateUtils";
import styles from "./App.module.css"

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
    this.setState({ courses: courses.filter(course => course.id !== id) });
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
      date: dateToString(new Date())(templates.MODEL),
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
      <>
        <div>
          <Router>
            <Header />
            <main className={styles.mainContent}>
              <Container>
                <Switch>
                  <Route path="/" exact>
                    <FilteredCoursesList
                      courses={this.state.courses}
                      deleteCourse={this.deleteCourse}
                    />
                  </Route>
                  <Route path="/create">
                    <CourseInformation
                      title="New course"
                      course={this.createNewCourse()}
                      saveAction={this.addCourse}
                    />
                  </Route>
                  <Route path="/edit/:id">
                    <CourseInformation
                      title="Edit course"
                      saveAction={this.updateCourse}
                      cloneCourseById={this.cloneCourseById}
                    />
                  </Route>
                </Switch>
              </Container>
            </main>
          </Router>
        </div>
        <Footer/>
      </>
    );
  }
}

export default App;
