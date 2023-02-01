import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import LoadingPage from "../LoadingPage/LoadingPage";
import styles from "./Favorites.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  const allFavorites = useSelector((state) => state.favorites);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  const currentRecipes = allFavorites.slice(
    indexOfFirstRecipes,
    indexOfLastRecipes
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (allFavorites.length < 1) {
    if (window.confirm("No favorites added")) {
      window.open("home", "_self");
    } else {
      window.open("home", "_self");
    }
  }

  return (
    <div>
      {allFavorites.length > 0 ? (
        <div>
          <div className={styles.homeContainer}>
            <Link to={"/home"}>
              <button className={styles.buttonBackHome}>BACK HOME</button>
            </Link>
            <div className={styles.cardContainer}>
              {currentRecipes?.map((el, index) => {
                return (
                  <div key={`card${index}`}>
                    <div>
                      <Card
                        img={el.image}
                        name={el.name}
                        diets={el.diets}
                        id={el.id}
                        healthScore={el.healthScore}
                        createdInDb={el.createdInDb}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.paginationHome}>
              <Paginated
                recipesPerPage={recipesPerPage}
                allRecipes={allFavorites.length}
                pagination={pagination}
                currentRecipes={currentRecipes}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}
