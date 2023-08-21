# Étape 1: Sauvegarder le dossier actuel dans un dossier BACKUP

BACKUP_DIR="BACKUP_$(date +%Y%m%d_%H%M%S)"
mkdir $BACKUP_DIR
cp -r * $BACKUP_DIR

# Étape 2: Récupérer le dépôt distant et copier seulement les fichiers qui sont différents

REMOTE_REPO="https://github.com/eesnault1/blog-jardinage-nuxt"

TMP_DIR="TMP_CLONE"
mkdir $TMP_DIR
git clone $REMOTE_REPO $TMP_DIR

# Liste des fichiers/fichiers à exclure de la mise à jour
EXCLUDE=("public/*" ".env" "articles/*")

rsync -av --progress --exclude=${EXCLUDE[@]} $TMP_DIR/ ./ 

# Etape 3 : supression du dossier temporaire 
rm -rf $TMP_DIR

# Etape 4 : Affichage du Readme.md de la mag 
echo -e "\n\n=== README MAJ ===\n"
cat $TMP_DIR/READMEMAJ.md
