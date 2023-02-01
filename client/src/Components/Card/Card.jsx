import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  const { img, name, diets, id, healthScore } = props;
  return (
    <div className={styles.mainDiv}>
      <Link className={styles.linkDetails} to={`/recipes/${id}`}>
        <div className={styles.divImage}>
          {healthScore < 34 ? (
            <div className={styles.healthScoreRed}>
              <p className={styles.healthScoreText}>Health Score</p>
              {`${healthScore}`}
            </div>
          ) : (
            <div
              className={
                healthScore < 67
                  ? styles.healthScoreOrange
                  : styles.healthScoreGreen
              }
            >
              <p className={styles.healthScoreText}>Health Score</p>
              {`${healthScore}`}
            </div>
          )}
          <img
            src={img}
            alt={`receta ${name}`}
            className={styles.recipeImage}
          />
        </div>
        <h1 className={styles.cardName}>
          {name[0].toUpperCase() + name.slice(1)}
        </h1>
        <div className={styles.dietDiv}>
          {diets.map((d) => (
            <div className={styles.diet} key={d.name}>
              {d.name}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
