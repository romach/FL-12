import React from "react";
import Container from "./Container";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          &copy; Videocourses, All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}
