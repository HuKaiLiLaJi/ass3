import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import SendMailView from '@/views/SendMailView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import UserAPI from '@/views/UsersAPI.vue'
import MapView from '@/views/MapView.vue'
import PathView from '@/views/PathView.vue'

import LogoutView from '@/views/LogoutView.vue'

import BookListView from '@/components/BookList.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddBookFunctionView from '@/views/AddBookFunctionView.vue'
import BookListFunctionView from '@/views/BookListFunctionView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'


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
    path: '/bookList',
    name: 'BookList',
    component: BookListView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView // week9
  },
  {
    path: '/addBookFunction',
    name: 'AddBookFunction',
    component: AddBookFunctionView // week9
  },
  {
    path: '/booksFunction',
    name: 'BookListFunction',
    component: BookListFunctionView // week9
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI, // week10
    meta: { requiresAuth: true } // need login
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