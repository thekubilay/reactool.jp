import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import auth from './modules/auth/router.js'
import dashboard from './modules/dashboard/routes/index'
import sumaipad from './modules/sumipad/routes/index'

Vue.use(VueRouter)

const base = [
  {
    path: '/',
    redirect: { name: 'projects' }
  },
]

const routes = base.concat(auth, dashboard, sumaipad)
const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.get_token) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
    else {      
      // if (store.getters.get_project !=null) {
        next()          
      // }
    }
  } else {
      next()          
  }
})