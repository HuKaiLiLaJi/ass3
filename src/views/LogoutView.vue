<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router'



const router = useRouter()

const fireAuth = getAuth()

const user = sessionStorage.getItem('user')
const role = sessionStorage.getItem('role')
const gender = sessionStorage.getItem('gender')

const logout = () => {
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('role')
  sessionStorage.removeItem('gender')

  console.log(fireAuth.currentUser)
  signOut(fireAuth)
  router.push("/")
    .then(() => {
      location.reload()
    })
}

</script>
<template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5 mb-5">
    <div class="row">
      <h1 class="text-center">User Profile</h1>
      <h4 class="text-center">Username: {{ user }}</h4>
      <h4 class="text-center">Role: {{ role }}</h4>
      <h4 class="text-center">Gender: {{ gender }}</h4>
      <button type="submit" class="btn btn-primary me-2" @click="logout">Logout</button>
    </div>
  </div>
</template>