import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
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
  const diets = useSelector((state) => state.Diets);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

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
            {diets.map((el, index) => {
              return (
                <option key={`Diet${index}`} value={el.name}>
                  {el.name}
                </option>
              );
            })}
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
            <option value="asc">Ascendent 🡹</option>
            <option values="desc">Descendent 🡻</option>
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
            <option value="asc">Ascendent 🡹</option>
            <option value="desc">Descendent 🡻</option>
          </select>
        </div>
      </div>
      <button onClick={(e) => handleClick(e)} className={styles.refreshButton}>
        Refresh
      </button>
    </div>
  );
}
