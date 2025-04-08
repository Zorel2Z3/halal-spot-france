# HalalSpot France 🍽️

Une plateforme web permettant de localiser et découvrir les restaurants halal en France.

## Fonctionnalités principales

- 🗺️ **Cartographie interactive** avec Google Maps
- 🔍 **Recherche géolocalisée** (position actuelle ou par ville)
- 📱 **Interface responsive** adaptée à tous les appareils
- 🏷️ **Filtres avancés** (type de cuisine, gamme de prix, services)
- ⭐ **Système de notation** et d'avis utilisateurs
- 🔥 **Section "Tendances"** avec les restaurants les plus populaires
- 🎬 **Intégration de vidéos TikTok** pour les restaurants tendance

## Structure du projet

Le projet est divisé en deux parties principales :
- **Frontend** : Application React avec intégration Google Maps
- **Backend** : API REST développée avec Node.js, Express et MongoDB

## Configuration technique

### Backend
- Node.js avec Express
- MongoDB pour le stockage des données
- API RESTful pour la communication avec le frontend
- Système de géolocalisation

### Frontend
- React.js
- @react-google-maps/api pour l'intégration cartographique
- Interface utilisateur responsive et moderne

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Zorel2Z3/halal-spot-france.git
cd halal-spot-france

# Installation des dépendances backend
cd backend
npm install

# Installation des dépendances frontend
cd ../frontend
npm install
```

## Configuration

Créez un fichier `.env` dans le dossier `backend/config/` avec les informations suivantes :
```
PORT=5000
MONGO_URI=votre_uri_mongodb
```

Créez un fichier `.env` dans le dossier `frontend/` avec les informations suivantes :
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=votre_cle_api_google_maps
```

## Lancement

```bash
# Lancer le backend
cd backend
npm run dev

# Lancer le frontend
cd ../frontend
npm start
```

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
