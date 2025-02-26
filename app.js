//Establece la conexiopn con la base de datos en la nube //
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js"
  )
  .then(() => console.log("Conexion exitosa con MongoDB"))
  .catch((error) => console.error("Error al conectar MongoDB"));






  // Crea un esquema y un modelo //
const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: { String },
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
  },
  { collection: "Grupo-05" }
);

const SuperHero = mongoose.model("SuperHero", superheroSchema);




// Metodo CRUD para insertar, actualizar, eliminar y buscar //
async function insertSuperHero() {
  const hero = new SuperHero({
    nombreSuperHeroe: "Spiderman",
    nombreReal: "Peter Parker",
    edad: 25,
    planetaOrigen: "Tierra",
    debilidad: "Radioactiva",
    poderes: ["Trepar paredes", "Sentido aracnido", "Super fuerza", "Agilidad"],
    aliados: ["Ironman"],
    enemigos: ["Duende Verde"],
    creador: "Diego",
  });
  await hero.save();
  console.log("Superheroe insertado", hero);
}

insertSuperHero();




// Metodo para actualizar //
async function updateSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.updateOne(
    { nombreSuperHeroe: nombreSuperHeroe },
    { $set: { edad: 26 } }
  );
}

updateSuperHero("Spiderman");



// Metodo para eliminar //
async function deleteSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.deleteOne({
    nombreSuperHeroe: nombreSuperHeroe,
  });
  console.log("Superheroe eliminado:", result);
}

deleteSuperHero("Spiderman");




// Metodo para buscar //
async function findSuperHeroes() {
  const heroes = await SuperHero.find({ planetaOrigen: "Tierra" });
  console.log("Superheroes encontrados:", heroes);
}

findSuperHeroes();
