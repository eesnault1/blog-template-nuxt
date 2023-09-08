<template>
  <div class="container-card">
    <div v-for="article in data" :key="article.id">
      <CardArticleListDisplay :article="article" />
    </div>
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
<style>

.container-card {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  row-gap: 15px;
  margin-top: 20px;
}

.container-card > div {
  margin : auto;
}

@media screen and (min-width: 700px) {
  .container-card {
    grid-template-columns: repeat(2, 1fr);
    gap : 15px;
  }
}

@media screen and (min-width: 992px) {

.container-card {
  grid-template-columns: repeat(3, 1fr);
  gap : 15px;
}
}

@media screen and (min-width: 1400px) {

.container-card {
  grid-template-columns: repeat(4, 1fr);
  gap : 15px;
}
}

</style>
