<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue'

defineProps({
  src: String,
  alt: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <el-image :src="src" :alt="alt">
    <template #error>
      <div class="image-slot">
        <el-icon><IconPicture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<style scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.image-slot .el-icon {
  font-size: 30px;
}
</style>
