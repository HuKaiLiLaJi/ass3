<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router'

import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

const router = useRouter()

const fireAuth = getAuth()
const formData = ref({
  username: '',
  password: ''
})

const submitForm = async () => {
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password
    && !errors.value.confirmPassword && !errors.value.reason
    && !errors.value.validateFriend
  ) {

    signInWithEmailAndPassword(fireAuth, formData.value.username, formData.value.password)
      .catch((error) => {
        console.log(error)
      });

    sessionStorage.setItem('user', formData.value.username)

    const q = query(collection(db, 'users'), where('email', '==', formData.value.username))
    const querySnapshot = await getDocs(q)
    console.log(q)
    console.log(querySnapshot)
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().role)
        sessionStorage.setItem('role', doc.data().role)
        sessionStorage.setItem('gender', doc.data().gender)
      });
    } else {
      sessionStorage.setItem('role', 'customer')
      sessionStorage.setItem('gender', 'Unkonwn')
      console.log("No matching documents found.");
    }

    router.push("/admin")
      .then(() => {
        location.reload()
      })

    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }
}

const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

</script>
<template>
  <div class="container mt-5">
    <div class="row">
      <h1 class="text-center">User Login</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="email" class="form-control" id="username" @blur="() => validateName(true)"
            @input="() => validateName(false)" v-model="formData.username" />
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)" v-model="formData.password" />
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>

    </div>
  </div>
</template>