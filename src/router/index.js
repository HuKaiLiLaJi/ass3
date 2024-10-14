import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import SendMailView from '@/views/SendMailView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import UserAPI from '@/views/UsersAPI.vue'
import WeatherView from '@/views/WeatherView.vue'
import MapView from '@/views/MapView.vue'
import PathView from '@/views/PathView.vue'
import GenAIView from '@/views/GenAIView.vue'

import DashboardView from '@/views/DashboardView.vue'

import LogoutView from '@/views/LogoutView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/UserAPI',
    name: 'UserAPI',
    component: UserAPI
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/sendMail',
    name: 'SendMail',
    component: SendMailView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/addBook',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/pathNav',
    name: 'PathNav',
    component: PathView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/ai',
    name: 'GenAI',
    component: GenAIView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, admin: true } // need admin login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = sessionStorage.getItem('user')
    const role = sessionStorage.getItem('role')
    if (user == null || user == '') {
      next('/login'); // if not login
    } else {
      if (to.matched.some(record => record.meta.admin)) {
        if (role == 'admin') {
          next(); // admin user
        } else {
          next('/admin');  // if not admin
        }
      } else {
        next(); // logined user
      }
      next();
    }
  } else {
    next(); // visit no auth view
  }
});

export default router