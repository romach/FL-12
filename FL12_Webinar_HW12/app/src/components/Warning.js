import React, { Component } from "react";

export class Warning extends Component {
  render() {
    return (
      <div>
        {this.props.developers
          .filter(this.props.strategy)
          .map(developer => (
            <div className="warning-developer" key={developer.id}>
              <p>Name: {developer.name}</p>
              <p>Pertformance: {developer.performance}</p>
              <p>Salary: {developer.salary}</p>
              <p>Last vacation date: {developer.last_vacation_date}</p>
            </div>
          ))}
      </div>
    );
  }
}
