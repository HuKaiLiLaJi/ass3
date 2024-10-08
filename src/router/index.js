import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LogoutView from '@/views/LogoutView.vue'
import AddBookView from '@/components/AddBook.vue'
import BookListView from '@/components/BookList.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddBookFunctionView from '@/views/AddBookFunctionView.vue'
import BookListFunctionView from '@/views/BookListFunctionView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/fireRegister',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/fireLogin',
    name: 'Login',
    component: LoginView
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
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView, // week10
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI, // week10
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI, // week10
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
    if (user == null || user == '') {
      next('/fireLogin'); // if not login
    } else {
      next(); // logined user
    }
  } else {
    next(); // visit no auth view
  }
});

export default router