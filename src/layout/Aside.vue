<script setup lang="ts">
import { useRoute } from 'vue-router'
import Image from '@/components/image.vue'
import logo from '@/assets/images/aside/logo.png'
import user from '@/assets/images/aside/user.svg'
import userView from '@/assets/images/aside/user-view.svg'
import company from '@/assets/images/aside/company.svg'
import companyView from '@/assets/images/aside/company-view.svg'
import message from '@/assets/images/aside/message.svg'
import messageView from '@/assets/images/aside/message-view.svg'

const route = useRoute()
</script>

<template>
  <div class="py-9 h-full flex flex-col justify-between items-center">
    <div class="flex flex-col items-center">
      <Image :src="logo" class="w-9 h-9" />
      <router-link
        to="/job"
        :class="[
          'flex',
          'justify-center',
          'items-center',
          'w-12',
          'h-12',
          'mt-16',
          'rounded-lg',
          'from-primary-deep',
          'to-primary-shallow',
          route.path === '/job' ? 'bg-gradient-to-r' : ''
        ]"
      >
        <Image :src="route.path === '/job' ? userView : user" />
      </router-link>
      <router-link
        to="/company"
        :class="[
          'flex',
          'justify-center',
          'items-center',
          'mt-5',
          'w-12',
          'h-12',
          'rounded-lg',
          'from-primary-deep',
          'to-primary-shallow',
          route.path === '/company' ? 'bg-gradient-to-r' : ''
        ]"
      >
        <Image :src="route.path === '/company' ? companyView : company" />
      </router-link>
      <router-link
        to="/article"
        :class="[
          'flex',
          'justify-center',
          'items-center',
          'mt-5',
          'w-12',
          'h-12',
          'rounded-lg',
          'from-primary-deep',
          'to-primary-shallow',
          route.path === '/article' ? 'bg-gradient-to-r' : ''
        ]"
      >
        <Image :src="route.path === '/article' ? messageView : message" />
      </router-link>
    </div>
    <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
  </div>
</template>
