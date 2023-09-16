<template>
  <NuxtLoadingIndicator />
  <TheNavBar />
  <NuxtPage />
  <TheFooter v-if="storeArticle.isLoaded" />
  <TheCookie v-if="!cookieChoice && !cookieLocalStorage && storeArticle.isLoaded" @cookie="cookie" />
</template>

<script setup>
// Import des stores
import { useGetArticle } from '~/stores/getArticles'
import { useGoogleAddsense } from '~/stores/googleaddsense'
import { useConfigGlobal } from '~/stores/getConfigGlobal'

// Constantes des stores
const storeArticle = useGetArticle()
const storeGoogleAdd = useGoogleAddsense()
const storeConfig = useConfigGlobal()

// Chargement de toutes les données pour que le site fonctionne correctement
onBeforeMount(async () => {
  // Chargement des données propre au blog
  await storeConfig.grabJSONFile()
  // Chargement des données des articles
  await storeArticle.pageAccueil()
  await storeArticle.grabLastArticle()
  // Chargement des données Google ADSENSE
  await storeGoogleAdd.displayPubFonction()
  storeArticle.isLoaded = true
})

// Gestion de la bannière des cookies au chargement de la page
const cookieLocalStorage = ref(false)
onBeforeMount(() => {
  cookieLocalStorage.value = localStorage.getItem('showCookieBanner') !== null
  // Si l'utilisateur a précédemment accepté les cookies, initialisez GA
  if (localStorage.getItem('adsenseConsent') === 'Oui' || localStorage.getItem('adsenseConsent') === 'Non') {
    useGtagConsent(true)
  }
})

// Permet d'enlever la banner cookie lors du choix de l'utilisateur
const cookieChoice = ref(false)
const cookie = (cookieChoiceDone) => {
  cookieChoice.value = cookieChoiceDone.value
}

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0.5;
}

</style>
