import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css";
import { useSelector } from "react-redux";

export default function Nav() {
  let details = useSelector((state) => state.allRecipes);

  let amount = details.length - 1;
  let randomNumber = Math.floor(Math.random() * (amount - 0 + 1) + 0);
  let randomId = details[randomNumber].id;
  return (
    <div className={styles.mainDiv}>
      <Link to="/home">
        <div className={styles.navLogo}></div>
      </Link>
      <SearchBar className={styles.searchBar} />
      <div className={styles.buttonsDiv}>
        <Link to={`/favorites`}>
          <button className={styles.favorites}>Favorites</button>
        </Link>
        <Link to={`/recipes/${randomId}`}>
          <button className={styles.randomRecipe}>Random Recipe</button>
        </Link>
        <Link to="/CreateRecipe">
          <button className={styles.createRecipe}>Create Recipe</button>
        </Link>
      </div>
    </div>
  );
}
