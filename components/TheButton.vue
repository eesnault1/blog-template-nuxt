<template>
  <div class="btn-container">
    <button class="btn-container-btn" @click="$emit('action')">
      <slot />
    </button>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue'
defineEmits(['action'])

</script>
<style>

.btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-container-btn {
  padding: 8px 25px;
  color : var(--main-color);
  background: #d6ebda6f;
  border: 1px solid #d6ebda6f;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  border-radius: 50px;

}

.btn-container-btn:hover {
  border: 1px solid var(--main-color);
  background-color : #d6ebda;
}

</style>
