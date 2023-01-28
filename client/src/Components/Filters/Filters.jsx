import React from "react";
import { useDispatch } from "react-redux";
import {
  getRecipe,
  filterRecipesByDiets,
  ordenByName,
  ordenByScore,
} from "../../Actions";
import styles from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();

  function handleFilterDiet(e) {
    dispatch(filterRecipesByDiets(e.target.value));

    const filterAlfa = document.getElementById("alfa");
    filterAlfa.selectedIndex = 0;

    const filterSalud = document.getElementById("salud");
    filterSalud.selectedIndex = 0;
  }
  function handleOrdenByName(e) {
    dispatch(ordenByName(e.target.value));

    const filterSalud = document.getElementById("salud");
    filterSalud.selectedIndex = 0;
  }
  function handleOrdenByScore(e) {
    dispatch(ordenByScore(e.target.value));
    const filterAlfa = document.getElementById("alfa");
    filterAlfa.selectedIndex = 0;
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipe());

    const filterDiet = document.getElementById("diet");
    filterDiet.selectedIndex = 0;

    const filterAlfa = document.getElementById("alfa");
    filterAlfa.selectedIndex = 0;

    const filterSalud = document.getElementById("salud");
    filterSalud.selectedIndex = 0;
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <select
            className={styles.select}
            id="diet"
            onChange={(e) => handleFilterDiet(e)}
            defaultValue="default"
          >
            <option value="default">All Diets</option>
            <option value="gluten free">Gluten free</option>
            <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="dairy free">Dairy free</option>
            <option value="vegan">Vegan</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
          </select>
        </div>
        <div className={styles.filterContainer}>
          <select
            className={styles.select}
            id="alfa"
            onChange={(e) => handleOrdenByName(e)}
            defaultValue="default"
          >
            <option value="default" disabled>
              Alphabetically
            </option>
            <option value="asc">Ascendent</option>
            <option values="desc">Descendent</option>
          </select>
        </div>
        <div className={styles.filterContainer}>
          <select
            className={styles.select}
            id="salud"
            onChange={(e) => handleOrdenByScore(e)}
            defaultValue="default"
          >
            <option value="default" disabled>
              Health Score
            </option>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>
      </div>
      <button onClick={(e) => handleClick(e)} className={styles.refreshButton}>
        Refresh
      </button>
    </div>
  );
}
