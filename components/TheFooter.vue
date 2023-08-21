<template>
  <div class="footer-container">
    <div class="footer">
      <div class="footer-title">
        <h3> Blog Jardinage écologique et permaculture </h3>
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
          confidentialité
        </NuxtLink>
      </div>
      <div class="footer-contact">
        <h3>
          Contactez nous !
        </h3>
        <form>
          <TheButton>
            Contactez-nous !
          </TheButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

.footer-container {
    border-top : 1px solid #1f583aec;
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
    color: #1f583aec;
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
    color: #1f583aec;
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
