<template>
  <div>
    <job-item v-for="(i, d) in list" :key="d" :detail="i" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import JobItem from './job-item.vue'
type Link = {
  name: string
}
defineProps({
  list: {
    type: Array as unknown as PropType<[Link]>,
    default: () => [{}]
  }
})
</script>

<style scoped></style>
