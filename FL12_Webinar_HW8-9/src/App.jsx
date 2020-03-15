import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FilteredCoursesList from "./components/FilteredCoursesList/FilteredCoursesList";
import CourseInformation from "./components/CourseInformation/CourseInformation";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./App.module.css";

class App extends Component {
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
                    <FilteredCoursesList />
                  </Route>
                  <Route path="/create">
                    <CourseInformation type="new" title="New course" />
                  </Route>
                  <Route path="/edit/:id">
                    <CourseInformation title="Edit course" />
                  </Route>
                </Switch>
              </Container>
            </main>
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
