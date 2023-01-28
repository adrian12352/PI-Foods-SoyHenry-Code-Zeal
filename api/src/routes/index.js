const { Router } = require("express");
const { getDiets } = require("../controllers/DietControllers");
const {
  getName,
  getRecipe,
  postRecipe,
} = require("../controllers/RecipeControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//rutas de recipe
router.get(`/recipes`, getName);
router.get("/recipes/:id", getRecipe);
router.post("/recipes", postRecipe);
//rutas de diets
router.get("/diets", getDiets);
module.exports = router;
