import React from "react";
import styles from "./Paginated.module.css";

export default function Paginated({
  recipesPerPage,
  allRecipes,
  pagination,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.listPaginated}>
        <li className={styles.itemPaginated}>
          {pageNumbers?.map((number, index) => (
            <button
              key={`pagina${index}`}
              className={
                currentPage === number
                  ? styles.selectedPage
                  : styles.linkPaginated
              }
              onClick={() => pagination(number)}
            >
              {number}
            </button>
          ))}
        </li>
      </ul>
    </nav>
  );
}
