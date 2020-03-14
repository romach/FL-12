import React, { Component } from "react";
import PropTypes from "prop-types";
import { templates, dateToString, cloneDate } from "../../utils/DateUtils";
import styles from "./Calendar.module.css";
import classNames from "classnames/bind";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swappingDate: this.props.value
    };
  }

  changeSwappingMonth = difference => {
    this.setState(state => {
      const date = new Date(state.swappingDate);
      date.setDate(1);
      date.setMonth(date.getMonth() + difference);
      return {
        swappingDate: dateToString(date)(templates.MODEL)
      };
    });
  };

  renderMonth = date => {
    const monthNumber = date.getMonth();
    const monthes = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      <>
        <div
          className={styles.previousMonth}
          onClick={() => this.changeSwappingMonth(-1)}
        >
          &lt;
        </div>
        <div>
          {monthes[monthNumber]} {date.getFullYear()}
        </div>
        <div
          className={styles.nextMonth}
          onClick={() => this.changeSwappingMonth(+1)}
        >
          &gt;
        </div>
      </>
    );
  };

  renderDayNames = () => {
    const names = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return names.map(name => (
      <div key={name} className={styles.dayName}>
        {name}
      </div>
    ));
  };

  renderDays = (courseDate, swappingDate) => {
    const WEEKS_COUNT = 6;
    const DAYS_IN_WEEK = 7;
    const dateOfDay = cloneDate(swappingDate);
    dateOfDay.setDate(1);
    const dayOfWeek = (DAYS_IN_WEEK - 1 + dateOfDay.getDay()) % DAYS_IN_WEEK;
    dateOfDay.setDate(dateOfDay.getDate() - dayOfWeek);
    const days = [];
    for (let i = 0; i < WEEKS_COUNT * DAYS_IN_WEEK; i++) {
      const month = dateOfDay.getMonth();
      const dayOfMonth = dateOfDay.getDate();
      const isCourseDay =
        dateToString(courseDate)(templates.MODEL) ===
        dateToString(dateOfDay)(templates.MODEL);
      const isCurrentMonth = swappingDate.getMonth() === dateOfDay.getMonth();
      const boundClassNames = classNames.bind(styles);
      const dayClassName = boundClassNames({
        day: true,
        courseDay: isCourseDay,
        otherMonthDay: !isCurrentMonth
      });
      const key = `${month}-${dayOfMonth}`;
      const _date = cloneDate(dateOfDay);
      days.push(
        isCurrentMonth ? (
          <div
            onClick={() => {
              this.props.onChange(dateToString(_date)(templates.MODEL));
            }}
            className={dayClassName}
            key={key}
          >
            {dayOfMonth}
          </div>
        ) : (
          <div className={dayClassName} key={key}>
            {dayOfMonth}
          </div>
        )
      );
      dateOfDay.setDate(dateOfDay.getDate() + 1);
    }
    return days;
  };

  render() {
    const courseDate = new Date(this.props.value);
    const swappingDate = new Date(this.state.swappingDate);
    return (
      <section>
        <div className={styles.label}>
          <div>Date*</div>
          <div className={styles.selectedDate}>
            {dateToString(courseDate)(templates.CALENDAR)}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.month}>{this.renderMonth(swappingDate)}</div>
          <div className={styles.days}>
            {this.renderDayNames()}
            {this.renderDays(courseDate, swappingDate)}
          </div>
        </div>
      </section>
    );
  }
}

Calendar.propTypes = {
  onChange: PropTypes.instanceOf(Function).isRequired,
  value: PropTypes.string.isRequired
};

export default Calendar;
