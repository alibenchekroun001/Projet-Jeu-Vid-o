// Importation des dépendances
const express = require("express");
const cors = require("cors");

// Création de l'application Express
const app = express();





// Port du serveur
const PORT =  4001;

// Middlewares
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("mon backend de mon jeu uiggherufh ");
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});