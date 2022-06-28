import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path:'/article',
    name:'Article',
    component:()=>import('../views/Article.vue')
  },
  {
    path:'/article/:id',
    name:"ArticleBase",
    component:()=>import('../views/ArticleBase/ArticleBase.vue')
  },
  {
    path:'/links',
    name:'Links',
    component:()=>import('../views/Links.vue')
  },
  {
    path:'/message',
    name:'Message',
    component:()=>import('../views/Message.vue')
  },
  {
    path:'/info',
    name:'Infor',
    beforeEnter,
    component:()=>import('../views/Information.vue')
  },
  {
    path:'/admin',
    name:'Admin',
    beforeEnter:rootEnter,
    component:()=>import('../views/Admin.vue')
  },
  {
    path:'/editmd',
    name:'EditMd',
    component:()=>import('../views/EditMd.vue')
  }
]

function beforeEnter(to, from, next){
  let id = router.app.$store?.state.userInfo._id
  if(id){
    next()
  }else{
    next({path:'/'})
  }
}

function rootEnter(to,from,next){
  let name = router.app.$store?.state.rootName
  if(name){
    next()
    router.app.$store.commit("CHNAGESHOW",false)
  }else{
    next({path:'/'})
  }
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
  next()
})

export default router
