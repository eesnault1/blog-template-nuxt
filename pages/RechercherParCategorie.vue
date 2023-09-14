<template>
  <div class="section">
    <div class="section__title">
      <h2> Rechercher des articles par catégories : </h2>
    </div>
    <CategorieComponent @btn-call="rechercher()" />
    <p v-if="storeArticle.sousCategorieSelection.length && rechercheOn">
      Vous avez modifié la recherche, Appuyez sur rechercher pour raffarichir !
    </p>
    <p v-else-if="storeArticle.sousCategorieSelection.length && !storeArticle.searchByCat.length && !rechercheOn" class="span-error">
      Aucun article pour les catégories séléctionnées précèdemment !
    </p>
    <p v-else-if="!storeArticle.sousCategorieSelection.length" class="span-error">
      Selectionner au moins une catégorie !
    </p>
    <div v-else class="search-cat__result">
      <p>Voici vos résultats pour les catégories ci-dessus</p>
      <span> Plus l'article partage de catégories avec votre recherche, plus il se positionne en tête des résultats.</span>
    </div>
    <CardArticleList :data="listArticlePagination" />
    <ThePagination :page-size="8" :data="storeArticle.searchByCat" @change-page="changePage" />
  </div>
</template>

<script setup>
// Import des stores
import { useGetArticle } from '~/stores/getArticles'
import { useConfigGlobal } from '~/stores/getConfigGlobal'

// Import pour le SEO
import { useSeoSetup } from '~/composables/useSeoSetup'

// constantes des stores
const storeArticle = useGetArticle()
const storeConfig = useConfigGlobal()

const listArticlePagination = ref([])
const rechercheOn = ref(true)

const rechercher = () => {
  storeArticle.articleByCategorie(storeArticle.sousCategorieSelection)
  rechercheOn.value = false
}

const changePage = (visibleArticle) => {
  listArticlePagination.value = visibleArticle.value
}

watch(() => storeArticle.sousCategorieSelection.length, () => {
  rechercheOn.value = true
})

// Observe les changements de storeArticle.SearchCat pour mettre à jour les données
watch(() => storeArticle.SearchCat, async () => {
  await storeArticle.articleByCategorie(storeArticle.sousCategorieSelection)
})

// Chargement des données lors du chargement de la page
const loadData = async () => {
  await storeArticle.articleByCategorie(storeArticle.sousCategorieSelection)
}
loadData()

// SEO

const loadSEO = async () => {
  useSeoSetup(storeConfig.config.global, storeConfig.config.pages.recherche_categories)
  const generateJSONLD = () => JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: storeConfig.config.global ? `${storeConfig.config.global.url}` : '',
    logo: storeConfig.config.global ? `${storeConfig.config.global.url}/favicon.jpg` : '',
    name: storeConfig.config.global ? `${storeConfig.config.global.titre}` : '',
    description: storeConfig.config.global ? `${storeConfig.config.global.description}` : '',
    image: storeConfig.config.global ? `${storeConfig.config.global.url}${storeConfig.config.global.img}` : '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': storeConfig.config.global ? `${storeConfig.config.global.url}` : ''
    }
  })

  const jsonLdScript = {
    type: 'application/ld+json',
    innerHTML: generateJSONLD()
  }

  useHead({
    script: [jsonLdScript]
  })
}

onBeforeMount(async () => {
  if (!storeConfig.config) {
    await storeConfig.grabJSONFile()
    loadSEO()
  } else {
    loadSEO()
  }
})
</script>

<style scoped>

.section {
  width:90%;
  margin : 0px auto 0 auto;
}

.section__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
}

.search-cat__result > span {
  margin-top: 10px;
  font-size: 0.8rem;
  color: rgb(100, 100, 100);
}
</style>
