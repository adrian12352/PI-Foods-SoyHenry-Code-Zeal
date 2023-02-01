const { Diet } = require("../db");

const getDiets = async (req, res) => {
  try {
    const diets = await Diet.findAll();
    diets.length
      ? res.send(diets)
      : res.send("error al traer dietas(Dietas no encontradas)");
  } catch (e) {
    res.status(400).send("error al solicitar dietas");
  }
};
//getDiets
// - Obtener todos los tipos de dieta posibles
//   - En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)
module.exports = {
  getDiets,
};
