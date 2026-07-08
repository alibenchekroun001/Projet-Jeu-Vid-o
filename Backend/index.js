// Importation des dépendances
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Création de l'application Express
const app = express();

// Port du serveur
const PORT = process.env.PORT || 4001;

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "indra" })
  .then(() => console.log("Connecté à MongoDB Atlas (base : indra)"))
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err.message);
    process.exit(1);
  });

// Modèle Personnage
const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 20 },
    classId: { type: String, required: true },
    className: { type: String, required: true },
    subtitle: String,
    colors: {
      peau: String,
      cheveux: String,
      vetements1: String,
      vetements2: String,
      vetements3: String,
      vetements4: String,
    },
    hairCut: String,
    attitude: Number,
    // TODO : relier au compte utilisateur quand le login sera branché
    owner: { type: String, default: null },
    level: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);

// Route test
app.get("/", (req, res) => {
  res.send("Backend du jeu Indra");
});

// Créer un personnage (appelé par le bouton Jouer)
app.post("/api/characters", async (req, res) => {
  try {
    const { name, classId, className, subtitle, colors, hairCut, attitude, owner } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Le nom du personnage est obligatoire." });
    }
    if (!classId || !className) {
      return res.status(400).json({ error: "La classe du personnage est obligatoire." });
    }

    const character = await Character.create({
      name: name.trim(),
      classId,
      className,
      subtitle,
      colors,
      hairCut,
      attitude,
      owner: owner || null,
    });

    res.status(201).json(character);
  } catch (err) {
    console.error("Erreur création personnage :", err.message);
    res.status(500).json({ error: "Impossible de créer le personnage." });
  }
});

// Lister les personnages (pour l'écran de sélection plus tard)
app.get("/api/characters", async (req, res) => {
  try {
    const characters = await Character.find().sort({ createdAt: -1 });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: "Impossible de récupérer les personnages." });
  }
});

// Récupérer un personnage par son id
app.get("/api/characters/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Personnage introuvable." });
    }
    res.json(character);
  } catch (err) {
    res.status(400).json({ error: "Identifiant invalide." });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
