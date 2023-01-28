import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanDetail, detailCard } from "../../Actions";
import LoadingPage from "../LoadingPage/LoadingPage";
import styles from "./Details.module.css";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(cleanDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(detailCard(id));
  }, [dispatch, id]);

  const allsteps = !details.stepByStep
    ? ["This recipe hasn't steps"]
    : details.stepByStep;

  return (
    <div>
      {details.id ? (
        <div>
          <div className={styles.cardContainer}>
            <img
              src={details.image}
              alt={`img ${details.name}`}
              className={styles.recipeImage}
            />
            <h1 className={styles.cardTitle}>{details.name}</h1>
            <div className={styles.details}>
              Health Score:
              <span className={styles.healthScore}>{details.healthScore}</span>
            </div>
            <div className={styles.summary}>
              <h3>Summary:</h3>
              <div>{details.summary}</div>
            </div>
            <div className={styles.dietItem}>
              <h3 className={styles.dietItemTitle}>Diets:</h3>
              <div>
                {details.diets.map((el, index) => {
                  return (
                    <p key={`Diets${index}`} className={styles.dietBox}>
                      {el.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={styles.steps}>
              <span className={styles.stepItemTitle}>Steps:</span>
              <ol>
                {allsteps &&
                  allsteps.map((el, index) => {
                    return (
                      <h2 key={`Step${index}`} className={styles.liStep}>
                        {el}
                      </h2>
                    );
                  })}
              </ol>
            </div>
            <Link to="/home">
              <button className={styles.buttonHome}>More recipes</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <LoadingPage />
        </div>
      )}
    </div>
  );
}
