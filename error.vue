<template>
  <div>
    <TheNavBar />
    <div class="container-error">
      <div class="error">
        <p class="error__text-title">
          {{ error.statusCode }}
        </p>
        <p class="error__text-subtitle">
          Oooops.
        </p>
        <p class="error__text-message">
          {{ error.message }}
        </p>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

.container-error {
    margin: 60px 0px;
}
.error {
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.error__text-title {
    font-size: 5rem;
    font-weight: bold;
}

.error__text-subtitle{
    font-size: 1.5rem;
    font-weight: thin;
}
.error__text-message {
    font-size: 2rem;
}

</style>
