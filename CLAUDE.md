## Deploiement

Ce site est un site statique heberge sur Hostinger.
Le deploiement est automatique via un webhook GitHub → Hostinger.

**Apres chaque modification de fichier (contenu, images, CSS, JS, HTML) :**
1. `git add .`
2. `git commit -m "description claire de la modif"`
3. `git push origin main`

Ne jamais attendre que l'utilisateur demande de pousser.
Toujours pousser immediatement apres avoir termine les modifications.
Le site est live des que le push est effectue.

**Structure :**
- Branche de production : `main`
- Dossier racine du site : `/` (tout le contenu va dans public_html cote Hostinger)

## Mode de travail

Claude Code travaille en **autonomie totale**.
- Ne jamais demander de confirmation avant d'executer une action.
- Ne jamais s'arreter entre deux etapes pour attendre une validation.
- Quand une tache est donnee, l'executer de A a Z sans interruption :
  modifier les fichiers → tester si necessaire → commit → push.
- En cas de bug ou d'erreur, tenter de corriger soi-meme avant de remonter le probleme.
- Toujours privilegier l'action a la question.
