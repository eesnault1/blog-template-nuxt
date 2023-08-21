<template>
  <div
    class="categorie__container"
    :style="{
      'background-color': isHovered ? 'white' : categories.color,
      'border': '2px solid' + categories.color
    }"
    @click="displayCat()"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="categorie__name">
      {{ categories.name }}
    </div>
    <Icon
      v-if="!isDisplay"
      class="categorie__chevron-down"
      name="mdi:chevron-down"
    />
    <Icon
      v-else
      class="categorie__chevron-up"
      name="mdi:chevron-up"
    />
  </div>
  <div v-if="isDisplay" class="categorie__list" :style="{'border' : '2px solid' + categories.color}">
    <div v-for="categorie in categories.categories" :key="categorie">
      <SousCategorieCard :sous-categorie="categorie" :color="categories.color" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import SousCategorieCard from './SousCategorieCard.vue'
defineProps({
  categories: {
    type: Object,
    required: true
  }
})
const isDisplay = ref(false)
const isHovered = ref(false)

const displayCat = () => {
  isDisplay.value = !isDisplay.value
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

</script>

<style>

.categorie__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding : 5px 10px;
    border-radius : 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.categorie__container:active {
    background-color : white;
}

.categorie__name {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 600;
    color:#3B3B39;
}

.categorie__list {
    border-radius : 1px;
}

.categorie__chevron-down,
.categorie__chevron-up {
  color:#3B3B39;
}

@media screen and (min-width: 768px) {

  .categorie__container:hover {
    background-color : white;
}

}

</style>
