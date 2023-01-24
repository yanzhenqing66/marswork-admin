<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/useUserStore'
import type { FormInstance } from 'element-plus'
import { fetchLogin } from '@/api/path/user'
import type { UserFormParams } from '@/api/path/user'

const ruleFormRef = ref<FormInstance>()

const formData = reactive({ email: '', password: '' })
const router = useRouter()
const { setToken, setUserInfo } = useUserStore()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const params: UserFormParams = {
        account: formData.email,
        pwd: formData.password,
        loginType: 'EMAIL'
      }
      fetchLogin(params).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          setToken(res.data.token)
          setUserInfo(res.data.userInfo)
          router.replace('/')
        }
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-96 h-80 bg-white rounded-lg py-8 px-3">
      <el-form :model="formData" ref="ruleFormRef" label-position="top">
        <el-form-item
          label="Email"
          prop="email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <el-input v-model="formData.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-input v-model="formData.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <div class="w-full flex justify-center">
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Login</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
