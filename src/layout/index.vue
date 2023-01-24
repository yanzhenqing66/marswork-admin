<script setup lang="ts">
import Aside from './Aside.vue'
</script>

<template>
  <el-container class="h-screen">
    <el-aside width="102px"><Aside /></el-aside>
    <el-main  style="padding:42px 30px" class="bg-[#f5f5f5]">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
