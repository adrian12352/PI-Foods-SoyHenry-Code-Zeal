import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Actions";
import styles from "./CreateRecipe.module.css";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDiets = useSelector((state) => state.Diets);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 50,
    stepByStep: [""],
    image: "",
    diet: [],
  });

  function validate(newRecipe) {
    let errors = {};
    if (!input.name.length) {
      errors.name = "Your recipe needs a name";
    } else if (!input.diet.length) {
      errors.diet = "Your recipe at least needs a diet";
    } else if (!input.summary) {
      errors.summary = "Your recipe needs a summary";
    } else if (input.image.length > 255) {
      errors.image = `255 characters or less(Characters:${input.image.length})`;
    } else if (input.summary.length > 255) {
      errors.summary = `255 characters or less(Characters:${input.summary.length})`;
    } else if (input.stepByStep.length > 255) {
      errors.stepByStep = `255 characters or less(Characters:${input.stepByStep.length})`;
    } else if (input.name.length > 255) {
      errors.name = `255 characters or less(Characters:${input.name.length})`;
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleChangeStep(e) {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diet: [...input.diet, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          diet: [...input.diet, e.target.value],
        })
      );
    }
    if (e.target.checked === false) {
      setInput({
        ...input,
        diet: input.diet.filter((el) => el !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    if (!input.name) {
      alert("Name required");
      return false;
    }
    if (!input.summary) {
      return alert("Summary required");
    }
    if (!input.diet.length) {
      return alert("Your recipe at least needs a diet");
    }
    if (input.image.length > 255) {
      return alert("Invalid image url");
    }
    if (input.name.length > 255) {
      return alert("Name very long");
    }
    if (input.summary.length > 255) {
      return alert("Summary very long");
    }
    if (input.stepByStep.length > 255) {
      return alert("Steps very long");
    }
    let steps = input.stepByStep.map((e) => e.length);
    if (steps.includes(0)) {
      input.stepByStep = ["This recipe hasn't steps"];
    }
    if (input.healthScore > 100 || input.healthScore < 0) {
      return alert("Health Score invalid");
    }
    if (!input.healthScore) {
      input.healthScore = "0";
    }
    if (!input.image) {
      input.image =
        "https://static.vecteezy.com/system/resources/previews/002/387/840/non_2x/service-icon-flat-style-isolated-on-white-background-free-vector.jpg";
    } else if (
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(input.image)
    ) {
      return alert("Url imagen invalid");
    }
    dispatch(postRecipe(input));
    alert("Recipe Created Successfully");
    setInput({
      name: "",
      summary: "",
      healthScore: 50,
      stepByStep: [""],
      image: "",
      diet: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const selecDiet = input.diet.join(" || ").toUpperCase();

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainDiv}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.formDiv}>
          <h1 className={styles.title}>CREATE A NEW RECIPE</h1>
          <div>
            <div>
              <h3 className={styles.labelContent}>Name(required):</h3>
              <input
                autoComplete="off"
                className={styles.inputContent}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                onPaste={(e) => handleChange(e)}
              />
              {errors.name && <p className={styles.errors}>{errors.name}</p>}
            </div>
            <div className={styles.contentBox}>
              <h3 className={styles.labelContent}>Diets(required):</h3>
              {allDiets.map((el) => {
                return (
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name={el.name}
                      value={el.name}
                      onChange={(e) => handleCheck(e)}
                      onPaste={(e) => handleCheck(e)}
                    />
                    {el.name.toUpperCase()}
                  </label>
                );
              })}
              ;{errors.diet && <p className={styles.errors}>{errors.diet}</p>}
              {selecDiet && <p className={styles.selectDiets}>{selecDiet}</p>}
            </div>
            <div>
              <h3 className={styles.labelContent}>Summary (required):</h3>
              <textarea
                autoComplete="off"
                className={styles.inputContent && styles.resume}
                type="text"
                value={input.summary}
                name="summary"
                onChange={(e) => handleChange(e)}
                onPaste={(e) => handleChange(e)}
              />
              {errors.summary && (
                <p className={styles.errors}>{errors.summary}</p>
              )}
            </div>
            <div>
              <h3 className={styles.labelContent}>Health Score:</h3>
              <div>
                <input
                  autoComplete="off"
                  className={styles.inputContent && styles.score}
                  type="range"
                  min="0"
                  max="100"
                  value={input.healthScore}
                  name="healthScore"
                  onChange={(e) => handleChange(e)}
                />

                {input.healthScore < 34 ? (
                  <span className={styles.scoreTextRed}>
                    {input.healthScore}
                  </span>
                ) : (
                  <span
                    className={
                      input.healthScore < 67
                        ? styles.scoreTextOrange
                        : styles.scoreTextGreen
                    }
                  >
                    {input.healthScore}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className={styles.labelContent}>Url Image:</h3>
              <input
                autoComplete="off"
                className={styles.inputContent}
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
                onPaste={(e) => handleChange(e)}
              />
              {input.image && <p className={styles.errors}>{errors.image}</p>}
            </div>
            <div>
              <h3 className={styles.labelContent}>Steps:</h3>
              <textarea
                className={styles.inputContent && styles.textarea}
                type="text"
                value={input.stepByStep}
                name="stepByStep"
                onChange={(e) => handleChangeStep(e)}
                onPaste={(e) => handleChangeStep(e)}
              />
              {errors.stepByStep && (
                <p className={styles.errors}>{errors.stepByStep}</p>
              )}
            </div>
            <div className={styles.divButton}>
              <button type="submit" className={styles.buttonCreate}>
                CREATE RECIPE
              </button>
              <Link to={"/home"} className={styles.buttonBack}>
                BACK HOME
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
