import React from "react";
import { Link } from "react-router-dom";
import styles from "./InitialPage.module.css";

export default function InitialPage() {
  return (
    <div className={styles.mainDiv}>
      <Link className={styles.button} to="/home">
        GET IN
      </Link>
    </div>
  );
}
