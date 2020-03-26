import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import developersData from "./developers.json";
import { Unit } from "./components/Unit";
import { Manager } from "./components/Manager";
import { Warning } from "./components/Warning";

function buildDevelopersMap(data) {
  const developersMap = new Map();
  data.forEach(item => {
    developersMap.set(item.id, item);
    if (item.rm_id) {
      const manager = developersMap.get(item.rm_id);
      manager.poolMemebers = manager.poolMemebers
        ? [...manager.poolMemebers, item]
        : [item];
    }
  });
  return developersMap;
}

function App() {
  const developersMap = buildDevelopersMap(developersData);
  const rootManager = developersMap.get(1);
  const developers = Array.from(developersMap.values())
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All Employees</Link>
            </li>
            <li>
              <Link to="/all-units">All units</Link>
            </li>
            <li>
              Warning Employees
              <ul>
                <li><Link to="/warning-employess/low-performance">Low performance</Link></li>
                <li><Link to="/warning-employess/high-salary">High salary</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Manager data={rootManager} />
          </Route>
          <Route path="/all-units">
            <Unit data={rootManager} />
          </Route>
          <Route path="/warning-employess/low-performance">
            <Warning developers={developers} strategy={developer => developer.performance === 'low'}/>
          </Route>
          <Route path="/warning-employess/high-salary">
            <Warning developers={developers} strategy={developer => developer.salary >= 1000}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
