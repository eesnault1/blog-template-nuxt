<template>
  <div
    v-if="totalPages() > 0"
    class="pagination"
  >
    <span
      v-if="showPreviousLink()"
      class="pagination-previous"
      @click="updatePage(currentPage -1)"
    >
      <Icon
        name="material-symbols:arrow-left"
        class="pagination-previous__icon"
      />
    </span>
    <span
      class="pagination-curent"
    >
      {{ currentPage + 1 }} sur {{ totalPages() }}
    </span>
    <span
      v-if="showNextLink()"
      class="pagination-next"
      @click="updatePage(currentPage + 1)"
    >
      <Icon
        name="material-symbols:arrow-right"
        class="pagination-next__icon"
      />
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['changePage'])

const currentPage = ref(0)
const visibleArticle = ref([])
const data = ref(props.data)

// Calcul le nombre de pages necessaires
const totalPages = () => {
  return Math.ceil(data.value.length / props.pageSize)
}

// Met à jour la page pour le component parent
const updatePage = (pageNumber) => {
  currentPage.value = pageNumber
  visibleArticle.value = data.value.slice(currentPage.value * props.pageSize, (currentPage.value * props.pageSize) + Number(props.pageSize))
  emit('changePage', visibleArticle)
}

// Met àjour la flèche : Page suivante et page précedente
const showNextLink = () => {
  return currentPage.value !== (totalPages() - 1)
}

const showPreviousLink = () => {
  return currentPage.value !== 0
}

// Lorsque les données changent, remet à jour la pagination
watch(() => props.data, (newValue) => {
  data.value = newValue
  totalPages()
  updatePage(0)
})

updatePage(0)

</script>

<style>

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap : 10px;
  margin: 20px 0px;
}

.pagination-current {
  margin: 0 10px;
}

.pagination-previous,
.pagination-next {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-color);
  color : var(--text-color);
  padding: 5px 10px ;
  cursor: pointer;
}

.pagination-next__icon,
.pagination-previous__icon{
  font-weight: 300;

}

</style>
