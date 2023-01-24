import { createRouter, createWebHashHistory } from 'vue-router'
// import useUserStore from './store/useUserStore'
import Cookies from 'js-cookie'
import Login from '@/page/login/index.vue'
import Layout from '@/layout/index.vue'
import Job from '@/page/job/index.vue'
import JobDetail from '@/page/job/detail.vue'
import companyDetail from '@/page/company/detail.vue'
import Company from '@/page/company/index.vue'
import Article from '@/page/article/index.vue'
import ArticleDetail from '@/page/article/detail.vue'
import ArticleCateGory from '@/page/article/category.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/job',
    children: [
      {
        path: '/job',
        component: Job
      },
      {
        path: '/job/:id',
        component: JobDetail
      },
      {
        path: '/company/:id',
        component: companyDetail
      },
      {
        path: '/company',
        component: Company
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/article/:id',
        component: ArticleDetail
      },
      {
        path: '/article/add',
        component: ArticleDetail
      },
      {
        path: '/article/category',
        component: ArticleCateGory
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // const { token } = useUserStore()
  const token = Cookies.get('token')

  if (to.path !== '/login' && !token) next({ path: '/login' })
  else next()
})

export default router
