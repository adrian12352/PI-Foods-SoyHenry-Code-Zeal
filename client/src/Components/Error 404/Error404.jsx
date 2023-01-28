import React from "react";
import styles from "./Error404.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Error404() {
  let location = useLocation();

  return (
    <div className={styles.mainDiv}>
      <div className={styles.errorDiv}>
        <h1 className={styles.errorMessage404}>Error404</h1>
        <h1 className={styles.errorMessage}>
          Page "{location.pathname}" Not Found
        </h1>
        <Link to="/home">
          <button class={styles.buttonBack}>Back Home</button>
        </Link>
      </div>
    </div>
  );
}
