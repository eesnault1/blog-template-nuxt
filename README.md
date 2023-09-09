
# Template de Blog / NUXT JS 3

Ce template offre une solution prête à l'emploi pour créer rapidement son blog avec un contenu facilement modifiable.

Vous devez avoir au moins 7 articles sur votre site pour que celui-ci marche. 

## Étapes d'installation

### 1. **Clonage du répertoire**  

   Pour démarrer, clonez ce répertoire afin de récupérer tous les fichiers nécessaires :
   ```bash
   git clone --bare https://github.com/eesnault1/blog-template-nuxt monDossier
   ```

   ```bash
   cd monDossier
   ```
   
   ```bash
   npm install
   ```


### 2. **Modification des fichiers de configuration**  
   Pour personnaliser votre blog, vous devrez modifier trois fichiers :


1. `globalTemplateConfig.JSON`

Ce fichier vous permet de configurer l'affichage global, le SEO et les diverses pages de votre site :

```json
{
  "global": {
      "url": "",
      "titre": "",
      "description": "",
      "img": ""
  },
  "pages": {
    "tous_les_articles": {
      "titre": "",
      "description": "",
      "img": ""
    },
    "choix_categorie_accueil": {
      "categorie_1": "",
      "categorie_2": ""
    },
    "recherche_input": {
      "titre": "",
      "description": "",
      "img": ""
    },
    "recherche_categories": {
      "titre": "",
      "description": "",
      "img": ""
    }
  }
}
```

 2. `.env`

Ce fichier vous permet de configurer des variables d'environnement qui seront utilisées dans votre projet. Assurez-vous de remplir chaque champ. Exemple :

```
GA_ID=Votre_Google_Analytics_ID
ADSENSE_ID=Votre_Adsense_ID
SITE_URL=https://monblog.com
GMAIL_ADRESSE=Votre_Adresse_GMAIL
GMAIL_MDP=Votre_Mot_De_Passe_GMAIL_Application 
```

 3. `categorie.json`

Ce fichier vous permet de définir les catégories principales ainsi que leurs sous-catégories. Vous pouvez également spécifier une couleur pour chaque catégorie principale. Voici une structure exemple :

```json
{
  "mainCategories": [
    {
      "name": "Nom de la catégorie principale",
      "color": "#codeCouleur",
      "categories": [
        "Sous-catégorie 1",
        "Sous-catégorie 2"
      ]
    },
    {
      "name": "Autre catégorie principale",
      "color": "#autreCodeCouleur",
      "categories": [
        "Autre sous-catégorie 1",
        "Autre sous-catégorie 2"
      ]
    }
  ]
}
```

Chacun de ces fichiers est primordial pour assurer le bon fonctionnement du site 

### 3. **Ajout des favicons**  
   Placez les trois fichiers favicons (`favicon.ico`, `favicon.jpg` et `favicon.png`) dans le répertoire `public`. Ces favicon corresponde à l'icone de votre blog

### 4. **Création des articles**  
   Pour ajouter un article à votre blog, vous devrez créer un fichier `.md` qui suit le format ci-dessous :

   ```markdown
   ---
   title: Titre de votre article
   img: lien_vers_limage.jpg
   slug: titre-court-et-unique-de-larticle
   date: 2023-01-01
   lastModif: 2023-01-01
   categories: categorie1, categorie2
   auteur: Votre nom
   description: Une brève description de votre article.
   id: un_identifiant_unique
   ---

   TEXTE DE L'ARTICLE AVEC LA SYNTAXE MARKDOWN
   ```


### 5. **Ajout des photos**  

Pour ajouter des photos à votre blog, suivez les étapes ci-dessous :

1. **Placement des photos** : 

Les photos doivent être placées à l'intérieur du dossier `public`. Ce dossier est prévu pour contenir tous les fichiers statiques.

2. **Organisation avec des sous-dossiers** : 

À l'intérieur du dossier `public`, vous êtes libre de créer autant de sous-dossiers que vous le souhaitez pour mieux organiser vos photos ou d'autres ressources. Par exemple, si vous souhaitez regrouper certaines photos dans un sous-dossier appelé `photos`, vous pouvez le faire.

3. **Accès aux photos dans le code** : 

Une fois que vous avez placé vos photos dans le dossier approprié, vous pouvez y accéder dans votre code en utilisant un chemin relatif. 
   
   **Exemple** : Si vous avez ajouté une photo nommée `test.jpg` à l'intérieur d'un sous-dossier `photos` dans `public`, vous pourrez accéder à cette photo dans votre code en utilisant le chemin : `./photos/test.jpg`.

   **Exemple 2** :  
   
    ```json
    "global": {
        "img": "`./photos/test.jpg`"
      },
    ```

## Mise à jour


Pour mettre à jour ce projet avec les dernières modifications du template sans écraser vos configurations et vos articles, veuillez utiliser le script `updateTemplate.sh` fourni.

1. **Rendre le script executable** : 

```
chmod +x updateTemplate.sh


```
2. **Exécuter le script** : 


```
./updateTemplate.sh
```

Le script sauvegardera d'abord votre projet actuel dans un dossier BACKUP, puis il mettra à jour votre projet avec les derniers fichiers du dépôt distant, en excluant vos configurations et vos articles.

3. Consultez le `READMEMAJ.md` affiché après la mise à jour pour connaître les éventuelles étapes supplémentaires ou les notes importantes.

ATTENTION : Des fichiers peuvent être à ajouter ou des configurations peuvent être à modifier. 


## Et ensuite ?

Si vous souhaitez mettre en ligne votre site : 

### Mise en ligne avec Vercel

1. **[Vercel](https://vercel.com)**

2. **Connectez votre dépôt à Vercel**

3. **Déploiement** : Une fois que tout est configuré, Vercel déploiera automatiquement votre site, ajouter votre nom de domaine si vous souhaitez le voir en ligne


## Exemple de site codé avec ce template 

[Potager-bio](https://potager-bio.fr)


