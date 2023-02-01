import React from "react";
import styles from "./Footer.module.css";
import spoonacular from "./Images/spoonacularApi.png";
import github from "./Images/github.png";
import linkedin from "./Images/linkedin.png";

export default function Footer() {
  return (
    <footer className={styles.mainDiv}>
      <h2>ABOUT</h2>
      <div className={styles.footerDiv}>
        <a
          href="https://spoonacular.com/food-api"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <img className={styles.spoonacular} src={spoonacular} alt="" />
          spoonacular API
        </a>
        <a
          href="https://github.com/Code-Zeal"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <img className={styles.github} src={github} alt="" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/code-zeal/"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <img className={styles.linkedin} src={linkedin} alt="" />
          Linkedin
        </a>
      </div>
      <h2>made with a lot of ❤️ & ☕</h2>
    </footer>
  );
}
