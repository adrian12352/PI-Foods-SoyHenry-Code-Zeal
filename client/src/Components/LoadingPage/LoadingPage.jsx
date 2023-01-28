import React from "react";
import styles from "./LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.spinner}></div>
      <h1 className={styles.loadingTitle}>LOADING...</h1>
    </div>
  );
}
