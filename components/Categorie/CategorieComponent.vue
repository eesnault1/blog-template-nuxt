<template>
  <div class="categorie">
    <div class="categorie-list">
      <div v-for="categorie in storeArticle.categorie" :key="categorie.name">
        <CategorieCard :categories="categorie" />
      </div>
    </div>
    <div class="categorie-selection">
      <p v-if="storeArticle.sousCategorieSelection.length">
        Vous avez selectionné les catégories suivantes :
      </p>
      <div class="categorie-selection__display">
        <div
          v-for="item in storeArticle.sousCategorieSelection"
          :key="item"
          class="categorie-selection__display-item"
        >
          <span :style="{ 'background-color': item.color }">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
    <div class="categorie-button">
      <TheButton @action="$emit('btn-call')">
        Rechercher
      </TheButton>
    </div>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue'
import { useGetArticle } from '../../stores/getArticles'
defineEmits(['btn-call'])
const storeArticle = useGetArticle()
storeArticle.grabJSONFile()

</script>

<style>
.categorie-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.categorie-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  row-gap: 15px;
  margin : 20px 0;
}

.categorie-selection__display {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: auto;
  grid-gap: 10px;
  margin : 20px 0;
}

.categorie-selection__display-item > span {
  display: inline-block;
  width: 100%;
  padding: 5px;
  border-radius: 1px;
  text-align: center;
}

@media (min-width: 768px) {

}

@media (min-width: 959px) {

}

</style>
