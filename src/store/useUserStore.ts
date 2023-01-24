import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : null,
    token: Cookies.get('token') || ''
  }),
  actions: {
    setToken(token: string) {
      Cookies.set('token', token)
      this.token = token
    },
    setUserInfo(info: any) {
      localStorage.setItem('userInfo', JSON.stringify(info))
      this.userInfo = info
    }
  }
})

export default useUserStore
