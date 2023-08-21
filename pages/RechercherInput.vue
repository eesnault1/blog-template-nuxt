<template>
  <div class="section">
    <div class="section__title">
      <h2 class="">
        Recherche d'articles
      </h2>
    </div>
    <div v-if="storeArticle.searchValue.length !== 0" class="section__recherche">
      Vous avez recherché : <span>{{ storeArticle.searchValue }}</span>
    </div>
    <CardArticleList v-if="storeArticle.articleSearch.length >0" :data="listArticlePagination" />
    <div v-else-if="storeArticle.searchValue.length === 0">
      Faites une recherche avec la barre de recherche
      <div>
        Retouner au
        <NuxtLink to="/">
          menu
        </NuxtLink>
      </div>
    </div>
    <div v-else class="section__noresult">
      Aucun article ne correspond à votre recherche, essayez avec des termes plus précis !
    </div>
    <ThePagination :page-size="8" :data="storeArticle.articleSearch" @change-page="changePage" />
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

const changePage = (visibleArticle) => {
  listArticlePagination.value = visibleArticle.value
}

// SEO

const loadSEO = () => {
  const { generateJSONLD } = useSeoSetup(storeConfig.config.global, storeConfig.config.pages.recherche_input)
  useJsonld(generateJSONLD())
}

onMounted(async () => {
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
  margin : 0px auto 40px auto;
}

.section__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
}

.section__recherche {
  margin : 20px 0px;
}

.section__noresult {
  color : red;
}

</style>
