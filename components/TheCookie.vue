<template>
  <div class="container-cookie">
    <div class="cookie-card">
      <p class="description">
        <span class="title">🍪 Cookies | </span>
        Nous utilisons des cookies pour nous assurer que vous bénéficiez de la meilleure expérience possible sur notre site web.
        <nuxt-link class="description" to="/PolitiqueConfidentialite">
          En savoir plus sur l'utilisation des cookies sur notre site
        </nuxt-link>
      </p>
      <p class="description">
        Voulez-vous acceptez les cookies ?
      </p>
      <div class="actions">
        <TheButton @action="cookieChoice('Oui')">
          Oui
        </TheButton>
        <p class="refuse-cookie" @click="cookieChoice('Non')">
          Non
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGoogleAddsense } from '~/stores/googleaddsense'
const storeGoogleAdd = useGoogleAddsense()

const emit = defineEmits(['cookie'])
const cookieChoiceDone = ref(false)

const cookieChoice = (choice) => {
  // Permet de ne pas redemander le choix de l'utilisateur
  localStorage.setItem('showCookieBanner', 'false')
  // Permet d'enlever la banner quand l'utilisateur à fait son choix
  cookieChoiceDone.value = true
  emit('cookie', cookieChoiceDone)
  if (choice === 'Oui') {
    localStorage.setItem('adsenseConsent', 'Oui')
    storeGoogleAdd.displayPubFonction()
    useGtagConsent(true)
  } else {
    useGtagConsent(true)
    localStorage.setItem('adsenseConsent', 'Non')
    storeGoogleAdd.displayPubFonction()
  }
}
</script>

<style scoped>
.container-cookie {
  z-index: 20;
  background-color: #00000061;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
}
.cookie-card {
  background-color: white;
  height: 250px;
  width: 500px;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.title {
  font-weight: 600;
  color: rgb(31 41 55);
}

.description {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1rem;
  color: rgb(75 85 99);
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.refuse-cookie {
  text-decoration: underline;
  color : blue;
  font-size: 0.5rem;
}
</style>
