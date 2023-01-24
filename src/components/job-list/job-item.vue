<template>
  <router-link :to="'/job/' + detail.id">
    <div class="flex items-center my-4 py-1 border-b">
      <el-avatar :src="detail.hiring_organization_logo" style="width: 60px; height: 60px" />
      <div class="ml-4 flex-1 flex justify-between">
        <div>
          <h3 class="text-base">{{ detail.hiring_organization_name }}</h3>
          <h2 class="text-xl">{{ detail.title }}</h2>
          <p class="text-gray-400">{{ getStrCountry(detail.locations) }}</p>
        </div>
        <div class="text-right">
          <h2 class="text-xl" v-show="detail.min_yearly_salary || detail.max_yearly_salary">
            {{ formatPriceK(detail.min_yearly_salary) + '-' + formatPriceK(detail.max_yearly_salary) }}
          </h2>
          <p class="text-gray-400">
            {{ detail.postDays === 0 ? 'New' : detail.postDays + 'd' }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import formatPriceK from '@/libs/formatPrice'
import getStrCountry from '@/libs/getStrCountry'

defineProps({
  detail: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped></style>
