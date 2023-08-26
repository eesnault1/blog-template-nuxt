const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');

async function main() {
    const REMOTE_REPO = "https://github.com/eesnault1/blog-template-nuxt";
    const EXCLUDE = new Set(["public", ".env", "content", "styles/main.css", "updateTemplate.js", ".git", "data", ".gitignore"]);
    const TMP_DIR = "TMP_CLONE";

    const git = simpleGit();

    // Cloner le dépôt distant
    try {
        await git.clone(REMOTE_REPO, TMP_DIR);
    } catch (err) {
        console.error('Failed to clone: ', err);
        process.exit(1);
    }


// Fonction pour copier récursivement les fichiers et les dossiers d'un chemin donné.
const copyFilesRecursively = async (startPath) => {
    // Lire le contenu du dossier à partir du chemin donné.
    const filesAndDirs = await fs.readdir(startPath);
    
    // Parcourir chaque élément (fichier ou dossier) dans le dossier actuel.
    for (const fileOrDir of filesAndDirs) {
        // Créer le chemin complet vers l'élément actuel.
        const filePath = path.join(startPath, fileOrDir);

        const relativePath = filePath.replace(TMP_DIR + path.sep, "");
        if (EXCLUDE.has(fileOrDir) || EXCLUDE.has(relativePath)) {
            console.log(filePath)
            continue;
        }
        // Obtenir les statistiques de l'élément pour déterminer s'il s'agit d'un fichier ou d'un dossier.
        const stats = await fs.stat(filePath);

        // Verifier quels fichiers peuvent être lu
                    // Si l'élément est un fichier...
            if (stats.isFile()) {
                    // Si le fichier n'est pas exclu, lire son contenu.
                    const fileContent = await fs.readFile(filePath, 'utf8');
                    // Écrire le contenu du fichier dans le dossier cible tout en remplaçant le nom du dossier temporaire par le dossier racine.
                    await fs.outputFile(path.join('.', filePath.replace(TMP_DIR, "")), fileContent);
            }
            // Si l'élément est un dossier...
            else if (stats.isDirectory()) {
                // ... appeler récursivement la fonction pour copier le contenu de ce dossier.
                await copyFilesRecursively(filePath);
            }

        

    }
};


    await copyFilesRecursively(TMP_DIR);

    // Affichage du Readme.md de la maj
    console.log("\n\n=== README MAJ ===\n");
    const readmeContent = await fs.readFile('./READMEMAJ.md', 'utf8');
    console.log(readmeContent);

    // Supression du dossier temporaire 
    await fs.remove(TMP_DIR);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
