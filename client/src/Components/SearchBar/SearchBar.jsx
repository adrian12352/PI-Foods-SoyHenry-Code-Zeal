import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBar } from "../../Actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let pattern = /^[A-Za-z0-9\s]+$/g;
    if (!pattern.test(name)) {
      return alert("Enter a Valid Diet or Recipe Name...");
    } else {
      dispatch(searchBar(name));
    }
    setName("");
  };

  return (
    <div className={styles.mainDiv}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Diet or Recipe Name..."
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={name}
          className={styles.search}
        />
        <button type="submit" className={styles.submit}>
          Search
        </button>
      </form>
    </div>
  );
}
