import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Logo" />
            <span className={styles.text}>Learn</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};
export default Header;
