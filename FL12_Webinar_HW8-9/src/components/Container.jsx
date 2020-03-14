import React, { Component } from "react";
import styles from "./Container.module.css";

export default class Container extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
