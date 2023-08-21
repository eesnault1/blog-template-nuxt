<template>
  <div class="section-first-article">
    <NuxtLink class="section-first-article__link" :to="`/articles/${data.slug}`">
      <nuxt-img
        provider="vercel"
        class="section-first-article__img"
        :src="data.img"
        :alt="data.description"
        height="250"
        loading="eager"
        quality="80"
      />
      <div class="section-first-article__content">
        <span>{{ data.categories.split(',')[0] }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.section-first-article {
  margin-bottom: 50px;
}

.section-first-article__link {
    color: inherit;
    text-decoration: none;
}

.section-first-article__link:hover {
    color: inherit;
    text-decoration: none;
}

.section-first-article__content {
  width: 90%;
  margin: 0.75rem auto 3rem auto;
  display: flex;
  flex-direction: column;
  gap : 1rem;
}

.section-first-article__content > span {
  color: var(--main-color);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8rem;
}

.section-first-article__content > p  {

    overflow: hidden;
    display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    text-overflow: ellipsis
}

.section-first-article__img {
  opacity: 0.8;

  width: 100%;
  object-fit: cover;
}

@media screen and (min-width: 992px) {

.section-first-article {
    width: 80%;
    margin : auto;
}

.section-first-article__content {
  width: 95%;
}

.section-first-article__img {
    border-radius : 0px 0 10px 10px;
}
}

@media screen and (min-width: 1200px) {

.section-first-article {
    width: 95%;
    margin : auto;
}

.section-first-article {
  margin-bottom: 50px;
}

.section-first-article__content:hover {
  background-color: rgb(250, 250, 250);
}

.section-first-article__img {
  height : 500px;
}

.section-first-article__link {
  height: 100%;
  position: relative;
}

.section-first-article__content {
  position: absolute;
  bottom: 0;
  background-color: white;
  padding: 20px;
  margin: 0;
  max-width: 60%;
  border-top-right-radius: 20px;
}

}

</style>
