import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqyLCGo__iRXwuP_G9UUrCCKgZ8ebBHA0",
  authDomain: "week7-yupeng.firebaseapp.com",
  projectId: "week7-yupeng",
  storageBucket: "week7-yupeng.appspot.com",
  messagingSenderId: "54988424660",
  appId: "1:54988424660:web:cd87bf59030c04c6a58241",
  measurementId: "G-W73JGXXZSZ"
};

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
