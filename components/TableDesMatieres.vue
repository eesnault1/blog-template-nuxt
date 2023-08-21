<template>
  <div class="aside">
    <div class="aside__sticky">
      <h2 class="aside__title">
        Sur cette page
      </h2>
      <nav class="aside__nav">
        <ul class="aside__list">
          <li
            v-for="link of data.body.toc.links"
            :key="link.id"
            :class="{ 'aside__list-item--indented': link.depth === 3 }"
            class="aside__list-item"
          >
            <p
              class="aside__link"
              :class="{ 'active': link.text === hLink.text }"
              @click="onClick(link.id)"
            >
              {{ link.text }}
            </p>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  activeTocId: {
    type: Array,
    required: true
  }
})
const hLink = ref([])

// Observe les changements de activeTocId pour comparer avec l'ensemble des liens de la table des matières
watch(() => props.activeTocId, (first) => {
  const temp = props.data.body.toc.links.find(el => el.id === `${first}`)
  // Si undefined pas de maj de hLink
  if (temp) {
    hLink.value = temp
  }
})

// Permet d'accéder à la section correspondante
const onClick = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

</script>

<style scoped>
.active {
  color: #1f583aec;
  border-left: 3px solid #417244 !important;
}
.aside {
  display: flex;
}
.aside__title {
  text-transform: uppercase;
  color: var(--text-color);
  font-weight: 700;
  margin: 16px 0px;
  letter-spacing: 2px;
}

.aside__nav {
  margin-top: 6px;
}

.aside__list {
  list-style-type: none;
}

.aside__list-item {
  margin-bottom: 3px;
}

.aside__list-item--indented {
  padding-left: 4px;
}

.aside__link {
  border-left: 3px solid rgba(0, 0, 0, 0.11);
  padding-left: 3px;
  font-weight: 300;
  transition: all 0.75s;
  cursor: pointer;
}
</style>
