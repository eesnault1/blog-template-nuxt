<template>
  <div class="section">
    <div class="section__title">
      <h2 class="">
        Tous les Articles présents sur le site
      </h2>
    </div>
    <!-- Affiche liste catégories sur pc -->
    <div class="categorie-display">
      <p
        v-for="categorie in randomCatArray"
        :key="categorie"
        class="categorie-display__link"
        @click="displayArticleByCat(categorie)"
      >
        {{ categorie }}
      </p>
    </div>
    <!-- Display les articles -->
    <CardArticleList v-if="listArticlePagination.length" :data="listArticlePagination" />
    <TheSpinner v-else-if="!isLoading" />
    <div v-else class="span-error">
      Nous n'avons pas encore d'article pour la catégorie selectionnées
    </div>
    <ThePagination :page-size="8" :data="listArticle" @change-page="changePage" />
  </div>
</template>

<script setup>
// Import des stores
import { useGetArticle } from '~/stores/getArticles'
import { useConfigGlobal } from '~/stores/getConfigGlobal'

// Import JSON catégories
import categories from '~/assets/data/categories.json'

// Import pour le SEO
import { useSeoSetup } from '~/composables/useSeoSetup'

// constantes des stores
const storeArticle = useGetArticle()
const storeConfig = useConfigGlobal()

const randomCatArray = ref([])
const listArticle = ref([])
const listArticlePagination = ref([])
const isLoading = ref(false)

// Quand change la page, met à jour l'article visible
const changePage = (visibleArticle) => {
  listArticlePagination.value = visibleArticle.value
}

// Display les articles en fonction de la catégorie selectionées
const displayArticleByCat = async (categorie) => {
  if (categorie === 'Tous les articles') {
    listArticle.value = storeArticle.article
  } else {
    await storeArticle.articleByCategorie(categorie)
    listArticle.value = storeArticle.searchByCat
  }
}

// Display les catégories aléatoires en haut de pages
const randomCat = () => {
  const allCategories = categories.mainCategories.reduce((acc, category) => acc.concat(category.categories), [])
  while (randomCatArray.value.length < 4 && allCategories.length > 0) {
    const randomIndex = Math.floor(Math.random() * allCategories.length)
    const randomCategory = allCategories.splice(randomIndex, 1)[0]
    randomCatArray.value.push(randomCategory)
  }
  randomCatArray.value.unshift('Tous les articles')
}

// Initialise les catégories
onMounted(() => {
  randomCat()
})

// Au chargement de la page, display tous les articles
onMounted(async () => {
  await storeArticle.pageAccueil()
  listArticle.value = storeArticle.article.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })
  isLoading.value = true
})

// SEO
watch(storeConfig, (newVal) => {
  if (newVal) {
    useSeoSetup(storeConfig.config.global, storeConfig.config.pages.tous_les_articles)
  }
})

if (storeConfig.config) {
  useSeoSetup(storeConfig.config.global, storeConfig.config.pages.tous_les_articles)
}

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

.categorie-display{
  display: none;
}

.categorie-display__link{
  cursor: pointer;
}

@media screen and (min-width: 959px) {
  .categorie-display {
  display: flex;
  justify-content: start;
  margin : 30px 0px;
  align-items: center;
}

.categorie-display__link {
  border-right : 2px solid black;
  padding : 10px 15px;
}

.categorie-display > :last-child {
  border-right: none;
}

.categorie-display > :first-child {
  padding-left : 0px;
}
.categorie-display__link:hover {
  color : #1f583aec;
  box-shadow: inset 0 -2px 0 #1f583aec;
}

.categorie-display__link:focus {
  color : #1f583aec;
}
}

</style>
