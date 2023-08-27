<template>
  <div class="section">
    <!-- Le dernier Article de sortie -->
    <CardFirstArticle v-if="storeArticle.isLoaded" :data="storeArticle.lastArticle[0]" />
    <TheSpinner v-else />
    <div v-if="storeArticle.isLoaded && storeArticle.randomArticle[0]" class="section-width">
      <!-- L'avant dernier article de sortie -->
      <div class="section-second-article">
        <CardArticle :article="storeArticle.randomArticle[0]" />
      </div>
      <!-- Les 6 autres articles après les 2 premiers -->
      <div class="section-dernier">
        <div class="section-dernier__title">
          <h2>
            Dernières sorties
          </h2>
          <TheButton @action="redirectArticle()">
            Voir tout
          </TheButton>
        </div>
        <CarousselLateral v-if="storeArticle.isLoaded" :data="storeArticle.lastArticle.slice(1)" />
      </div>
    </div>
    <!-- Article Random parmis ceux qu'ils restent + Caroussel d'une catégorie -->
        <!-- Ne charge que si il y a assez d'articles sur le site -->
    <div v-if="storeArticle.isLoaded && storeArticle.randomArticle[1]" class="section-random__first">
      <div class="section-random__card">
        <CardArticle :article="storeArticle.randomArticle[1]" />
        <div class="section-dernier__title">
          <h2>
            {{ storeConfig.config.pages.choix_categorie_accueil.categorie_1 }}
          </h2>
          <TheButton @action="redirectArticle()">
            Voir tout
          </TheButton>
        </div>
        <CarousselLateral
          :data="storeArticle.accueil.cat1"
        />
      </div>
    </div>
    <!-- Article Random parmis ceux qu'ils restent + Caroussel d'une catégorie -->
            <!-- Ne charge que si il y a assez d'articles sur le site -->

    <div v-if="storeArticle.isLoaded && storeArticle.randomArticle[2]" class="section-random__second">
      <div class="section-random__card">
        <CardArticle :article="storeArticle.randomArticle[2]" />
        <div class="section-dernier__title">
          <h2>
            {{ storeConfig.config.pages.choix_categorie_accueil.categorie_2 }}
          </h2>
          <TheButton @action="redirectArticle()">
            Voir tout
          </TheButton>
        </div>
        <CarousselLateral
          :data="storeArticle.accueil.cat2"
        />
      </div>
    </div>
    <!-- Recherche par catégories -->
    <div v-if="storeArticle.isLoaded" class="section-search">
      <div class="section-search__title">
        <h2>
          Rechercher parmis les {{ storeArticle.article.length }} articles
        </h2>
        <p>
          Selectionner autant de catégories que vous souhaitez et rechercher vos articles parmis ces catégories !
        </p>
        <span v-if="isSelectCat" class="span-error">
          Vous devez avoir selectionné au moins 1 catégorie pour rechercher !
        </span>
      </div>

      <CategorieComponent @btn-call="redirection" />
    </div>
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

// Redirection catégories
const isSelectCat = ref(false)
const redirection = async () => {
  if (!storeArticle.sousCategorieSelection.length) {
    isSelectCat.value = true
  } else {
    await navigateTo('/RechercherParCategorie')
  }
}

// Redirection articles
const redirectArticle = async () => {
  await navigateTo('/allArticle')
}

// SEO
const loadSEO = () => {
  const { generateJSONLD } = useSeoSetup(storeConfig.config.global, storeConfig.config.global)
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

.section-width,
.section-search {
  width: 92%;
  margin: 0 auto 20px auto;
}

.section-dernier {
  margin-top : 50px;
}

.section-dernier__title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.section-random__first {
  padding : 40px 0;
  background-color: #d6ebda6f;
}

.section-random__second {
  padding : 40px 0;
}

.section-random__card{
  width: 92%;
  margin: 0 auto ;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-search__title {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media screen and (min-width: 1200px) {

  .section-width,
.section-search {
  width: 80%;
  margin: 0 auto 0 auto;
}

.section-random__card {
  width: 80%;

}

}
</style>
