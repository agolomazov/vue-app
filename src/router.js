import VueRouter from 'vue-router'
import Customers from './components/Customers.vue'
import About from './components/About.vue'
import Add from './components/Add.vue'
import Read from './components/Read.vue'
import Edit from './components/Edit.vue'
import Login from './components/Login.vue'

const routes = [
  { path: '/', component: Customers },
  { path: '/about', component: About },
  { path: '/add', component: Add },
  { path: '/read/:id', component: Read },
  { path: '/edit/:id', component: Edit },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: __dirname
})

export default router