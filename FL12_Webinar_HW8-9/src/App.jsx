import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilteredCoursesList from "./components/FilteredCoursesList/FilteredCoursesList";
import CourseInformation from "./components/CourseInformation/CourseInformation";
import Container from "./components/Container";
import initialCourses from "./data.json";

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
      <>
        <div>
          <Router>
            <header style={{ height: 72, backgroundColor: "white" }}>
              <Container>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: "#3d3d3d",
                      textDecoration: "none"
                    }}
                  >
                    <img src="/logo.png" alt="Logo" />
                    <span
                      style={{
                        marginLeft: 10,
                        fontWeight: 600,
                        textTransform: "uppercase"
                      }}
                    >
                      Learn
                    </span>
                  </Link>
                </div>
              </Container>
            </header>
            <main style={{ paddingBottom: 48, paddingTop:90 }}>
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
              </Container>
            </main>
          </Router>
        </div>

        <footer style={{ height: 50, backgroundColor: "white" }}>
          <Container>&copy; Videocourses, All Rights Reserved.</Container>
        </footer>
      </>
    );
  }
}

export default App;
