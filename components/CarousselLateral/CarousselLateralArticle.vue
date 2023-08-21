<template>
  <div class="caroussel-card">
    <NuxtLink class="caroussel-card__link" :to="`/articles/${article.slug}`">
      <nuxt-img
        provider="vercel"
        class="caroussel-card-image"
        :src="article.img"
        :alt="article.description"
        width="290"
        height="140"
        loading="eager"
        quality="80"
      />
      <div class="caroussel-card-content">
        <span>{{ article.categories.split(',')[0] }}</span>
        <h2 class="caroussel-card-content__title">
          {{ article.title }}
        </h2>
        <p class="caroussel-card-content__text">
          {{ article.description }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>

defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

.caroussel-card {
    padding : 0px;
    height: 330px;
    width : 290px;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #455a4e11;
    background-color: white;
}

.caroussel-card:hover {
    background-color: rgb(250, 250, 250);

}

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    color: inherit;
    text-decoration: none; }

  .caroussel-card__link {
    display: inline-block;
    height: 100%;
  }

.caroussel-card-image {
    opacity: 0.8;
    border-radius : 10px 10px 0px 0px;
    object-fit: cover;
    margin : 0;
    width: 100%;
}

.caroussel-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap : 8px;
    padding: 12px;
}

.caroussel-card-content > span {
  color: var(--main-color);
  text-transform: uppercase;
  font-weight: 700;
  align-self : start;
  font-size: 0.8rem;
  overflow: hidden;
    display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    text-overflow: ellipsis

}
.caroussel-card-content__title {
    overflow: hidden;
    display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    text-overflow: ellipsis
}

.caroussel-card-content__text {
    overflow: hidden;
    display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    text-overflow: ellipsis
}

@media screen and (min-width: 1200px) {

    .caroussel-card {
    width : 300px;
    height: 340px;

}
}

</style>
