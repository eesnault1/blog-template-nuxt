<template>
  <div class="footer-container">
    <div class="footer">
      <div class="footer-title">
        <h3> Blog {{ storeConfig.config.global.titre }}  </h3>
      </div>
      <div class="footer-link">
        <h3> Lien rapide </h3>
        <NuxtLink class="footer-link__link" to="/">
          Accueil
        </NuxtLink>
        <NuxtLink class="footer-link__link" to="/AllArticle">
          Tous les articles
        </NuxtLink>
        <NuxtLink class="footer-link__link" to="/RechercherParCategorie">
          Rechercher par catégories
        </NuxtLink>
        <NuxtLink class="footer-link__link" to="/PolitiqueConfidentialite">
          Confidentialité
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfigGlobal } from '~/stores/getConfigGlobal'
const storeConfig = useConfigGlobal()

</script>

<style scoped>

.footer-container {
    border-top : 1px solid var(--main-color);
}
.footer {
    width:90%;
    margin : 0px auto 0 auto;
    padding: 30px 0px;
    display: flex;
    flex-direction: column;
    gap : 20px;
}

h3 {
    font-size: 1.4;
    color: var(--main-color);
}

.footer-link {
    display: flex;
    flex-direction: column;
}

.footer-link__link {
  padding: 12px 0px;
    text-decoration: none;
    color: black;
    font-weight: 500;
}

.footer-link__link:hover {
    text-decoration: underline;
    color: var(--main-color);
}

.footer-contact {
    display: flex;
    flex-direction: column;
    gap : 10px;
    align-items: start;
}

@media screen and (min-width: 959px) {
    .footer {
    flex-direction: row;
    justify-content: space-between;
    gap : 25px;
}
}
</style>
