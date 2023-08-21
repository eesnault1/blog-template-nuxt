<template>
  <div
    class="container-souscat"
  >
    <label
      class="container-souscat__text"
      :style="{ 'background-color': 'rgba(' + color + ', 0.5)' }"
      :for="sousCategorie"
    >
      {{ sousCategorie }}
    </label>
    <input
      :id="sousCategorie"
      v-model="checkedSousCat"
      :name="sousCategorie"
      type="checkbox"
      class="container-souscat__input"
      :value="sousCategorie"
      @change="storeArticle.categorieSelect(sousCategorie, checkedSousCat, color)"
    >
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useGetArticle } from '../../stores/getArticles'

const storeArticle = useGetArticle()
const props = defineProps({
  sousCategorie: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})
const checkedSousCat = ref()

const updateCheckedSousCat = () => {
  if (storeArticle.sousCategorieSelection.length !== 0) {
    const isSousCatSelected = storeArticle.sousCategorieSelection.some(
      (item) => {
        return item.value === props.sousCategorie
      }
    )
    checkedSousCat.value = isSousCatSelected
  } else {
    checkedSousCat.value = false
  }
}

updateCheckedSousCat()
</script>

<style>
.container-souscat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding : 3px 20px;
}

.container-souscat__text {
  font-size: 0.8rem;
  color:#3B3B39;

}

.container-souscat__input{
  appearance: none;
  background-color: #fff;
  margin: 0;
  width: 13px;
  height: 13px;
  border: 2px solid #3B3B39;
  cursor: pointer;
}

.container-souscat__input:checked{
  padding: 1px;
  background-color: #1f583aec;
}
</style>
