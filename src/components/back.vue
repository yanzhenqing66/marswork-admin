<template>
  <div class="w-8 h-8 border border-['b2b2b2'] rounded mr-5 flex items-center justify-center" @click="toBack">
    <span class="text-2xl leading-none">
      <el-icon><Back /></el-icon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  path: {
    type: String,
    default() {
      return ''
    }
  }
})
const router = useRouter()
function toBack() {
  if (props.path) {
    router.push(props.path)
  } else {
    router.go(-1)
  }
}
</script>
