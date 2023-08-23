# Étape 1: Sauvegarder le dossier actuel dans un dossier BACKUP

BACKUP_DIR="BACKUP_$(date +%Y%m%d_%H%M%S)"
mkdir $BACKUP_DIR
cp -r * 

# Étape 2: Récupérer le dépôt distant et copier seulement les fichiers qui sont différents

REMOTE_REPO="https://github.com/eesnault1/blog-template-nuxt"
EXCLUDE=("public/*" ".env" "articles/*" "styles/main.css" "updateTemplate.sh")

TMP_DIR="TMP_CLONE"
mkdir $TMP_DIR
git clone $REMOTE_REPO $TMP_DIR

# Liste des fichiers à exclure de la mise à jour
EXCLUDE_RSYNC=()
for exclude_file in "${EXCLUDE[@]}"; do
    EXCLUDE_RSYNC+=("--exclude=$exclude_file")
done

rsync -av --progress "${EXCLUDE_RSYNC[@]}" $TMP_DIR/ ./ 



# Etape 3 : Affichage du Readme.md de la maj
echo -e "\n\n=== README MAJ ===\n"
cat ./READMEMAJ.md

# Etape 4 : supression du dossier temporaire 
rm -rf $TMP_DIR