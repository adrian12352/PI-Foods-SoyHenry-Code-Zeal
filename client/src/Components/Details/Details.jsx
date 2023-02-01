import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanDetail, detailCard } from "../../Actions";
import LoadingPage from "../LoadingPage/LoadingPage";
import styles from "./Details.module.css";
import { deleteFavorite, addFavorite } from "../../Actions";
import Footer from "../Footer/Footer";

export default function Details() {
  const favorites = useSelector((state) => state.favorites);
  const details = useSelector((state) => state.detail);
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(cleanDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(detailCard(id));
  }, [dispatch, id]);

  const allsteps = !details.stepByStep
    ? ["This recipe hasn't steps"]
    : details.stepByStep;
  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(favorites.filter((r) => r.id === details.id)));
    } else {
      setIsFav(true);
      dispatch(addFavorite(details));
    }
  };
  useEffect(() => {
    let favId = favorites.map((el) => {
      return el.id;
    });
    if (favId.includes(details.id)) {
      setIsFav(true);
    } else setIsFav(false);
  }, [favorites, details.id]);
  return (
    <div>
      {details.id ? (
        <div>
          <div className={styles.cardContainer}>
            <Link to="/home">
              <button className={styles.buttonHome}>Back to Home</button>
            </Link>
            <img
              src={details.image}
              alt={`img ${details.name}`}
              className={styles.recipeImage}
            />
            {isFav ? (
              <button className={styles.buttonFav} onClick={handleFavorite}>
                ❤️Added to favorites❤️
              </button>
            ) : (
              <button className={styles.buttonFav} onClick={handleFavorite}>
                Click 🤍 to add to Favorites
              </button>
            )}
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
              <button className={styles.buttonHome}>Back to Home</button>
            </Link>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <LoadingPage />
        </div>
      )}
    </div>
  );
}
