import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import News from '../views/News.vue'
import newspage from '../views/Newspage.vue'
// �ޤJ�i�ױ�
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: News,
    component: News
    },
    {
     path: '/product',
     name: Product,
     component: Product
    },
    {
        path: '/newspage/:id',
        name: newspage,
        component: newspage
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// �M�ζi�ױ�
router.beforeEach((to, from, next) => {
    Nprogress.start();
    next()

})
router.afterEach((to, from, next) => {
    Nprogress.done();
})

export default router
