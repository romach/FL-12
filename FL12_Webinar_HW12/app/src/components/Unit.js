import React, { Component } from "react";

export class Unit extends Component {
  getSum(summingFunction) {
    return manager => {
      const childrenSum = manager.poolMemebers.reduce(
        (accumulator, member) => {
          const memberSum = member.poolMemebers
            ? this.getSum(summingFunction)(member)
            : {
                sum: summingFunction(member),
                count: 1
              };
          return {
            sum: accumulator.sum + memberSum.sum,
            count: accumulator.count + memberSum.count
          };
        },
        { count: 0, sum: 0 }
      );
      return {
        sum: summingFunction(manager) + childrenSum.sum,
        count: 1 + childrenSum.count
      };
    };
  }

  calculateAverageSalary(developer) {
    const salarySum = this.getSum(developer => developer.salary)(developer);
    return salarySum.sum / salarySum.count;
  }

  convertDateStringToMillis(dateString) {
    const regexResult = /(\d{2}).(\d{2}).(\d{4})/.exec(dateString);
    const day = regexResult[1];
    const month = regexResult[2];
    const year = regexResult[3];
    return new Date(year, month - 1, day).valueOf();
  }

  formatDateToString(date) {
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  calculateAverageLastVacationDate(developer) {
    const millisSum = this.getSum(developer =>
      this.convertDateStringToMillis(
        developer.last_vacation_date || this.formatDateToString(new Date())
      )
    )(developer);
    const averageDate = new Date(millisSum.sum / millisSum.count);

    const formattedDate = this.formatDateToString(averageDate);
    return formattedDate;
  }

  calculateAveragePerformance(developer) {
    const numericPerformanceSum = this.getSum(developer => {
      switch (developer.performance) {
        case "low":
          return 0;
        case "medium":
          return 1;
        case "top":
          return 2;
        default:
          return 1;
      }
    })(developer);
    const averageNumericPerformance =
      numericPerformanceSum.sum / numericPerformanceSum.count;
    if (averageNumericPerformance < 0.5) {
      return "low";
    } else if (averageNumericPerformance < 1.5) {
      return "medium";
    } else {
      return "top";
    }
  }

  render() {
    return (
      <div className="unit">
        <div className="unitName">{this.props.data.pool_name}</div>
        <div>
          Avarage performance:{" "}
          {this.calculateAveragePerformance(this.props.data)}
        </div>
        <div>
          Avarage last vacation date:{" "}
          {this.calculateAverageLastVacationDate(this.props.data)}
        </div>
        <div>
          Avarage salary: {this.calculateAverageSalary(this.props.data)}
        </div>
        <div className="children">
          {this.props.data.poolMemebers.map(item =>
            item.pool_name ? <Unit key={item.id} data={item} /> : null
          )}
        </div>
      </div>
    );
  }
}
