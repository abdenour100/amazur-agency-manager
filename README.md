# Amazur Agency Manager

Prototype d'un portail de gestion des clients et contenus de l'agence Amazur.

## État actuel

Cette première version est une **maquette d'interface** avec des données fictives. Elle ne contient pas encore :
- de connexion sécurisée pour les administrateurs et les médecins ;
- de base de données connectée ;
- de stockage réel ou de téléchargement de vidéos ;
- de paiements réels ni de notifications.

Ne saisissez aucune donnée personnelle ou financière réelle dans cette maquette.

## Démarrage local

Prérequis : Node.js 20.9 ou version plus récente.

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000.

## Prochaines étapes

1. Connecter Supabase Auth et protéger les pages.
2. Créer les tables clients, abonnements, paiements, vidéos et scripts.
3. Ajouter des règles RLS pour que chaque médecin ne voie que ses propres données.
4. Connecter le stockage privé des vidéos avec des URL signées.
5. Déployer et tester sur iPhone.

Les clés secrètes doivent rester dans les variables d'environnement et ne jamais être ajoutées au dépôt Git.