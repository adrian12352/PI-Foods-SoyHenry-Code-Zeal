const { Router } = require("express");
const { getDiets } = require("../controllers/DietControllers");
const {
  getName,
  getRecipe,
  postRecipe,
} = require("../controllers/RecipeControllers");
const router = Router();

router.get(`/recipes`, getName);
router.get("/recipes/:id", getRecipe);
router.post("/recipes", postRecipe);
router.get("/diets", getDiets);
module.exports = router;
