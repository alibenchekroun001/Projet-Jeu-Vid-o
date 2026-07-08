# 🎮 Indra

![Indra Logo](./docs/assets/logo.png)

## 🌌 Présentation

**Indra** est un MMORPG tactique en ligne développé en Full Stack avec la stack **MERN** :

- **MongoDB** : Base de données NoSQL
- **Express.js** : API Backend REST
- **React.js** : Interface utilisateur dynamique
- **Node.js** : Serveur d'exécution JavaScript

Le jeu propose un univers fantasy où les joueurs peuvent créer leur personnage, explorer un monde ouvert, combattre des monstres, accomplir des quêtes et progresser dans un système RPG complet.

Indra s'inspire des meilleurs MMORPG tactiques au tour par tour tout en développant son propre univers, ses mécaniques et son identité.

---

# 📌 Fonctionnalités principales

## 👤 Gestion des joueurs

- Création de compte
- Connexion sécurisée
- Authentification JWT
- Profil joueur
- Gestion des personnages
- Personnalisation de l'avatar
- Statistiques du joueur

---

# 🧙 Personnages

Chaque joueur peut créer un héros avec :

- Nom
- Classe
- Apparence
- Niveau
- Expérience
- Points de vie
- Mana
- Force
- Intelligence
- Agilité
- Chance

Exemples de classes :

- ⚔️ Guerrier
- 🔥 Mage
- 🏹 Archer
- 🛡️ Tank
- 🧙 Invocateur

---

# 🌍 Monde d'Indra

Le monde est composé de :

- Régions
- Villages
- Donjons
- Zones PvE
- Zones PvP
- Boss
- Ressources

Chaque zone possède :

- Niveau recommandé
- Monstres
- Récompenses
- Quêtes

---

# ⚔️ Système de combat

Combat tactique au tour par tour :

Fonctionnalités :

- Grille de combat
- Déplacement par cases
- Points d'action
- Points de mouvement
- Sorts
- Attaques
- Effets :
  - Poison
  - Paralysie
  - Bonus dégâts
  - Bouclier

---

# 🐉 Monstres

Chaque monstre possède :

- Niveau
- Vie
- Attaque
- Défense
- Intelligence artificielle
- Récompenses

Exemples :

- Gobelin
- Dragon
- Golem
- Créatures légendaires

---

# 🎒 Inventaire

Système complet :

- Objets
- Équipements
- Armes
- Armures
- Potions
- Ressources

Chaque objet possède :

```json
{
"name": "Épée d'Indra",
"level": 10,
"damage": 50,
"type": "weapon"
}
