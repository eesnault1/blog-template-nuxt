<template>
  <div class="card-article">
    <NuxtLink class="card-article__link" :to="`/articles/${article.slug}`">
      <nuxt-img
        provider="vercel"
        class="card-article-image"
        :src="article.img"
        :alt="article.description"
        width="370"
        height="180"
        loading="eager"
        quality="80"
      />
      <div class="card-article-content">
        <span>{{ article.categories.split(',')[0] }}</span>
        <h2 class="card-article-content__title">
          {{ article.title }}
        </h2>
        <p class="card-article-content__text">
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

.card-article {
  margin: auto;
    padding : 0px;
    height: 400px;
    min-width : 300px;
    max-width: 370px;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #455a4e11;
    background-color: white;
}

.card-article:hover {
background-color: rgb(250, 250, 250);
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    color: inherit;
    text-decoration: none; }

  .card-article__link {
    display: inline-block;
    height: 100%;
  }

.card-article-image {
    opacity: 0.8;
    border-radius : 10px 10px 0px 0px;
    object-fit: cover;
    margin : 0;
    width: 100%;
}

.card-article-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap : 8px;
    padding: 12px;
}

.card-article-content > span {
  color: var(--main-color);
  text-transform: uppercase;
  font-weight: 700;
  align-self : start;
  font-size: 0.8rem;

}
.card-article-content__title {
    overflow: hidden;
    display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    text-overflow: ellipsis
}

.card-article-content__text {
    overflow: hidden;
    display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    text-overflow: ellipsis
}

@media screen and (min-width: 750px) {
  .card-article {
    height: 270px;
    min-width : 100%;
    max-width: 100%;
}

.card-article__link {
    display: flex;
    width: 100%;

  }

  .card-article-content {
justify-content: space-around;
padding: 40px 20px;

}

  .card-article-image {
    border-radius : 10px 0px 0px 10px;
    min-width: 400px;
    height: 100%;
}
}

</style>
