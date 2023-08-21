<template>
  <div class="caroussel">
    <span v-if="data.length > 3" class="navigation-arrow-left" @mouseout="stopScrolling" @mouseover="startScrollingLeft">
      <Icon name="formkit:arrowleft" color="black" />
    </span>
    <span v-if="data.length > 3" class="navigation-arrow-right" @mouseout="stopScrolling" @mouseover="startScrollingRight">
      <Icon name="formkit:arrowright" color="black" />

    </span>
    <div ref="carousselContainer" class="container-caroussel">
      <div v-for="article in data" :key="article.id">
        <CarousselLateralArticle :article="article" />
      </div>
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

const carousselContainer = ref(null)
let scrollingInterval = null

// Speed pour le scroll horizontal
const calculateSpeedLeft = () => {
  if (!carousselContainer.value) { return 0 }
  const maxScrollLeft = carousselContainer.value.scrollWidth - carousselContainer.value.clientWidth
  const distanceLeft = maxScrollLeft - carousselContainer.value.scrollLeft
  return Math.max(1, Math.sqrt(maxScrollLeft - distanceLeft))
}

// Fonction pour commencer à défiler vers la gauche
const startScrollingLeft = () => {
  if (carousselContainer.value) {
    scrollingInterval = setInterval(() => {
      const speed = calculateSpeedLeft()
      carousselContainer.value.scrollBy({ left: -speed, behavior: 'auto' })
    }, 16)
  }
}

// Speed pour le scroll horizontal
const calculateSpeedRight = () => {
  if (!carousselContainer.value) { return 0 }
  const maxScrollLeft = carousselContainer.value.scrollWidth - carousselContainer.value.clientWidth
  const distanceLeft = maxScrollLeft - carousselContainer.value.scrollLeft
  return Math.max(1, Math.sqrt(distanceLeft))
}

const startScrollingRight = () => {
  if (carousselContainer.value) {
    scrollingInterval = setInterval(() => {
      const speed = calculateSpeedRight()
      carousselContainer.value.scrollBy({ left: speed, behavior: 'auto' })
    }, 16)
  }
}

// Fonction pour arrêter le défilement
const stopScrolling = () => {
  clearInterval(scrollingInterval)
  scrollingInterval = null
}
</script>
  <style scoped>

  .container-caroussel {
    height: 350px;
    display: flex;
    overflow: auto;
    gap: 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .container-caroussel::-webkit-scrollbar {
    display: none;
}

.caroussel {
  position: relative;

}

.navigation-arrow-left,
.navigation-arrow-right {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
}

.navigation-arrow-left > *,
.navigation-arrow-right > * {
  background-color: var(--main-color);
  opacity: 0.5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.navigation-arrow-left:hover > *,
.navigation-arrow-right:hover > * {
  opacity: 0.9;
}
.navigation-arrow-left {
  left: 0;
}

.navigation-arrow-right {
  right: 0;
}

@media screen and (min-width: 952px) {

.navigation-arrow-right,
.navigation-arrow-left {
  display: flex;
  justify-content: center;
  align-items: center;

}

}

@media screen and (min-width: 1200px) {

  .navigation-arrow-right {
    right: 0;
    margin-right: -60px;
  }
.navigation-arrow-left {
  left: 0;
  margin-left: -60px;
}

  .container-caroussel {
    gap: 40px;

  }

}

  </style>
